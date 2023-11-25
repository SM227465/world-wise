import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCities } from '../../contexts/CitiesContext';
import styles from './Map.module.css';
import { useGeolocation } from '../../hooks/useGeolocation';
import Button from '../button/Button';

interface Props {
  position: [number, number];
}

const ChangeCenter = (props: Props) => {
  const { position } = props;
  const map = useMap();
  map.setView(position);
  return null;
};

const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvents({
    click: (event) => navigate(`form?lat=${event.latlng.lat}&lng=${event.latlng.lng}`),
  });
  return null;
};

const Map = () => {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState<[number, number]>([40, 0]);
  const [searchParams] = useSearchParams();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();
  const lat = Number(searchParams.get('lat'));
  const lng = Number(searchParams.get('lng'));
  const hasGeoLocationPosition = 'lat' in geoLocationPosition && 'lng' in geoLocationPosition;

  useEffect(() => {
    if (lat && lng) {
      setMapPosition([lat, lng]);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (hasGeoLocationPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition, hasGeoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!hasGeoLocationPosition && (
        <Button type='position' onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}
      <MapContainer center={[lat, lng]} zoom={6} scrollWheelZoom={false} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map((city) => (
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

export default Map;
