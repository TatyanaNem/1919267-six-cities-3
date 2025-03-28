import { useRef, useEffect } from 'react';
import { Icon, LayerGroup, layerGroup, marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City } from '../../types/city';
import { Offer } from '../../types/offer';
import useMap from '../../hooks/use-map';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';

type MapProps = {
  city: City;
  offers: Offer[];
  hoveredOfferId: Offer['id'] | null;
  className: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({
  city,
  offers,
  hoveredOfferId,
  className,
}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLElement>(null);
  const map = useMap({ location: city?.location, mapRef });
  const markerLayer = useRef<LayerGroup>(layerGroup());

  useEffect(() => {
    if (map) {
      map.flyTo(
        [city.location.latitude, city.location.longitude],
        city.location.zoom,
      );
      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();
    }
  }, [city, map]);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        marker([offer?.location.latitude, offer?.location.longitude])
          .setIcon(
            offer.id === hoveredOfferId ? currentCustomIcon : defaultCustomIcon,
          )
          .addTo(markerLayer.current);
      });
    }
  }, [map, offers, hoveredOfferId]);

  return (
    <section
      className={`${className} map`}
      style={{
        height: '100%',
        minHeight: '500px',
        width: '100%',
        maxWidth: '1144px',
        margin: '0 auto',
      }}
      ref={mapRef}
    />
  );
}

export default Map;
