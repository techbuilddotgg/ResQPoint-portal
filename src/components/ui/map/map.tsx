'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  APIProvider as GoogleMapsAPIProvider,
  Map as GoogleMap,
  useMap,
  limitTiltRange,
} from '@vis.gl/react-google-maps';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { Color, LayersList } from 'deck.gl';
import { DataPoint } from '@/lib/types';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { useToast } from '@/hooks/use-toast';

export type DeckglOverlayProps = { layers?: LayersList };

export const DeckGlOverlay = ({ layers }: DeckglOverlayProps) => {
  const deck = useMemo(() => new GoogleMapsOverlay({ interleaved: true }), []);

  const map = useMap();
  useEffect(() => {
    deck.setMap(map);

    return () => deck.setMap(null);
  }, [deck, map]);

  useEffect(() => {
    deck.setProps({ layers, onViewStateChange: limitTiltRange });
  }, [layers, deck]);

  // No DOM rendered by this component
  return null;
};

const Map = ({ dataPoints }: { dataPoints: DataPoint[] }) => {
  const [radius, setRadius] = useState(20); // Start with a reasonable default radius
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setRadius((prevRadius) => (prevRadius + 10) % 100);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (radius === 30) {
      toast({
        title: 'SMS Sent!',
        description:
          'SMS alerts have been sent to residents in high-risk areas.',
      });
    }
  }, [radius, toast]);

  // Memoize the layers to prevent unnecessary re-renders
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

  return (
    <GoogleMapsAPIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
    >
      <GoogleMap
        defaultCenter={{ lat: 46.1512, lng: 14.9955 }}
        defaultZoom={8}
        gestureHandling="greedy"
        disableDefaultUI={true}
        keyboardShortcuts={false}
        mapId="739af084373f96fe"
      >
        <DeckGlOverlay layers={layers} />
      </GoogleMap>
    </GoogleMapsAPIProvider>
  );
};

export default Map;
