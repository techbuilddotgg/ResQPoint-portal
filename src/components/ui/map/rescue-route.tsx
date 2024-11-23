'use client';
import { useEffect } from 'react';
import { useMap } from '@vis.gl/react-google-maps';

type Props = {
  origin?: { lat: number; lng: number };
  destination?: { lat: number; lng: number };
  stop?: { lat: number; lng: number }; // Waypoint property
};

const RescueRoute = ({ origin, destination, stop }: Props) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true, // Hide the default "A" and "B" markers
      //  preserveViewport: true, // Keep the current viewport when displaying directions
    });

    directionsRenderer.setMap(map);

    if (!destination || !origin) return;

    // Construct the route request object
    const routeRequest: google.maps.DirectionsRequest = {
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: [],
      optimizeWaypoints: true, // Optional: to optimize the route order based on distance/time
    };

    // Add the waypoint if available
    if (stop) {
      routeRequest!.waypoints!.push({
        location: stop,
        stopover: true, // Indicates that this is a required stop (not just a pass-through)
      });
    }

    // Request directions
    directionsService.route(routeRequest, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);

        new google.maps.Marker({
          position: destination,
          map,
        });
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });

    return () => {
      directionsRenderer.setMap(null);
    };
  }, [destination, map, origin, stop]); // Added stop to dependency array

  return null;
};

export default RescueRoute;
