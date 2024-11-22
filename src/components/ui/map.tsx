'use client';
import React, { FC } from 'react';
import {
  APIProvider as GoogleMapsAPIProvider,
  Map as GoogleMap,
  MapProps as GoogleMapProps,
} from '@vis.gl/react-google-maps';

type MapProps = GoogleMapProps & {};

const Map: FC<MapProps> = ({ ...props }) => {
  return (
    <GoogleMapsAPIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
    >
      <GoogleMap
        {...props}
        defaultCenter={{ lat: 46.1512, lng: 14.9955 }}
        defaultZoom={8}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        keyboardShortcuts={false}
        mapId="map"
      >
        {/*{props.markers?.map((marker, index) => (*/}
        {/*  <AdvancedMarker*/}
        {/*    key={index}*/}
        {/*    position={{*/}
        {/*      lat: marker.lat,*/}
        {/*      lng: marker.lng,*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <Image src={Marker} alt={'marker'} />*/}
        {/*  </AdvancedMarker>*/}
        {/*))}*/}
      </GoogleMap>
    </GoogleMapsAPIProvider>
  );
};

export default Map;
