import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { Icon, LeafletMouseEvent, Marker } from 'leaflet';
import { BookingInfo } from '../../types/booking-info';
import { CityCoords } from '../../types/city-coords';
import useMap from '../../hooks/useMap';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../consts';

type MapProps = {
  points: BookingInfo[];
  size: {
    height: string;
    width: string;
    margin: string;
  };
  city: CityCoords;
  selectedPoint: BookingInfo;
  onPointChange: (point: BookingInfo) => void;
}

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

function Map({ points, size, city, selectedPoint, onPointChange }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap({ mapRef, city });

  const onClickHandler = (evt: LeafletMouseEvent) => {
    const point = points.find((pointToFind) => evt.latlng.lat === pointToFind.location.coords[0] && evt.latlng.lng === pointToFind.location.coords[1]);
    if (point) {
      onPointChange(point);
    }
  };

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.coords[0],
          lng: point.location.coords[1],
        });

        marker.setIcon(
          selectedPoint !== null && point.id === selectedPoint.id
            ? currentCustomIcon
            : defaultCustomIcon
        )
          .addTo(map);
        marker.on('click', onClickHandler);
      });
    }
  }, [map, selectedPoint, points]);

  return (
    <div
      ref={mapRef}
      style={{ height: size.height, width: size.width, margin: size.margin }}
    >

    </div>
  );
}

export default Map;
