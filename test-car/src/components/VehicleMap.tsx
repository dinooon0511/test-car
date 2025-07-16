import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Vehicle } from '../utils/sortUtils';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

interface VehicleMapProps {
  vehicles: Vehicle[];
}

const DEFAULT_POSITION: [number, number] = [55.751244, 37.618423]; // Москва по умолчанию
const DEFAULT_ZOOM = 5;

const VehicleMap: React.FC<VehicleMapProps> = ({ vehicles }) => {
  // Фильтруем только те машины, у которых есть координаты
  const vehiclesWithCoords = vehicles.filter(
    v => typeof v.latitude === 'number' && typeof v.longitude === 'number'
  );

  // Центр карты — первая машина с координатами или дефолт
  const center: [number, number] = vehiclesWithCoords.length > 0
    ? [vehiclesWithCoords[0].latitude as number, vehiclesWithCoords[0].longitude as number]
    : DEFAULT_POSITION;

  return (
    <div style={{ width: '100%', height: '350px', marginBottom: 24, borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px 0 rgba(61, 122, 166, 0.10)' }}>
      <MapContainer center={center} zoom={DEFAULT_ZOOM} style={{ width: '100%', height: '100%' }} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {vehiclesWithCoords.map(vehicle => (
          <Marker
            key={vehicle.id}
            position={[vehicle.latitude as number, vehicle.longitude as number]}
          >
            <Popup>
              <strong>{vehicle.name}</strong><br />
              {vehicle.model}<br />
              Год: {vehicle.year}<br />
              Цена: {vehicle.price}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default VehicleMap;
