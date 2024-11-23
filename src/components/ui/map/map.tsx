'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  AdvancedMarker,
  APIProvider as GoogleMapsAPIProvider,
  Map as GoogleMap,
} from '@vis.gl/react-google-maps';
import Image from 'next/image';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { Color } from 'deck.gl';
import { DataPoint } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { DeckGlOverlay } from '@/components/ui/map/deck-gl-layers';
import RescueRoute from '@/components/ui/map/rescue-route';
import { Button } from '@/components/ui/button';
import StopImage from './stop.png';

const Map = ({ dataPoints }: { dataPoints: DataPoint[] }) => {
  const [radius, setRadius] = useState(0); // Start with a reasonable default radius
  const { toast } = useToast();
  const [time, setTime] = useState<Date>(new Date());

  const [showStop, setShowStop] = useState(false);

  const [destination, setDestination] = useState<{
    lat: number;
    lng: number;
  }>();

  useEffect(() => {
    const interval = setInterval(() => {
      setRadius((prevRadius) => (prevRadius + 10) % 100);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (radius === 90) {
      setTime(new Date());
    } else {
      setTime((time) => new Date(time.getTime() + 60 * 60 * 1000));
    }
  }, [radius]);

  useEffect(() => {
    if (radius === 30) {
      toast({
        title: 'SMS Sent!',
        description:
          'SMS alerts have been sent to residents in high-risk areas.',
      });
    }
  }, [radius, toast]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23', // Use 24-hour format
    });
  };

  const layers = useMemo(() => {
    const blueColorRange: Color[] = [
      [173, 216, 230], // LightBlue for values 0-33
      [135, 206, 235], // SkyBlue for values 33-66
      [0, 0, 255], // Blue for values 66-100
    ];

    return [
      new HeatmapLayer<DataPoint>({
        data: dataPoints, // Use the state data for heatmap
        id: 'heatmap-layer',
        pickable: false,
        getPosition: (d) => [d[0], d[1]],
        getWeight: (d) => d[2], // Use density value as weight
        radiusPixels: radius, // Adjust radius for performance
        intensity: 1,
        threshold: 0.1,
        colorRange: blueColorRange,
        aggregation: 'MEAN',
      }),
    ];
  }, [dataPoints, radius]);

  const getRescueRoute = () => {
    const finish = {
      lat: 46.362178,
      lng: 15.109384,
    };

    if (radius >= 20) {
      setShowStop(true);
      setDestination(finish);
    } else {
      setShowStop(false);
      setDestination(finish);
    }
  };

  return (
    <div className="min-h-[100vh] overflow-hidden flex-1 rounded-xl md:min-h-min">
      <div className={'flex flex-row gap-4 my-4'}>
        <div className={'font-semibold'} suppressHydrationWarning>
          Current time: {formatTime(new Date())}
        </div>
        <div className={'font-semibold'} suppressHydrationWarning>
          Map time: {formatTime(time)}
        </div>
        {/*<Button className={'ml-auto'} onClick={getRescueRoute}>*/}
        {/*  Get rescue route*/}
        {/*</Button>*/}
      </div>
      <GoogleMapsAPIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      >
        <GoogleMap
          defaultCenter={{ lat: 46.415449, lng: 14.945257 }}
          defaultZoom={12}
          gestureHandling="greedy"
          disableDefaultUI={true}
          keyboardShortcuts={false}
          mapId="739af084373f96fe"
          reuseMaps
        >
          {showStop && (
            <AdvancedMarker
              position={{
                lat: 46.460983,
                lng: 14.870607,
              }}
            >
              <Image src={StopImage} alt={'Stop'} width={24} height={24} />
            </AdvancedMarker>
          )}
          <RescueRoute
            origin={destination && { lat: 46.46988, lng: 14.851815 }}
            destination={destination}
            stop={showStop ? { lat: 46.424411, lng: 15.186798 } : undefined}
          />

          <DeckGlOverlay layers={layers} />
        </GoogleMap>
      </GoogleMapsAPIProvider>
    </div>
  );
};

export default Map;
