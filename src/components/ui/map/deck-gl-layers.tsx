import { LayersList } from 'deck.gl';
import { useEffect, useMemo } from 'react';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { limitTiltRange, useMap } from '@vis.gl/react-google-maps';

export type DeckglOverlayProps = { layers?: LayersList };

export const DeckGlOverlay = ({ layers }: DeckglOverlayProps) => {
  const deck = useMemo(
    () =>
      new GoogleMapsOverlay({
        interleaved: true,
        onViewStateChange: limitTiltRange,
      }),
    [],
  );

  const map = useMap();
  useEffect(() => {
    deck.setMap(map);

    return () => deck.setMap(null);
  }, [deck, map]);

  useEffect(() => {
    deck.setProps({ layers });
  }, [layers, deck]);

  // No DOM rendered by this component
  return null;
};
