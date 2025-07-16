import React, { useEffect, useState } from 'react';
import { fetchVehicles } from '../services/vehicleService';
import { sortVehicles } from '../utils/sortUtils';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('year');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchVehicles()
      .then(data => {
        setVehicles(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  const sortedVehicles = sortVehicles(vehicles, sortBy, sortOrder);

  return (
    <div>
      <h2>Список машин</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Сортировать по:
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ marginLeft: 8, marginRight: 16 }}>
            <option value="year">Год</option>
            <option value="price">Цена</option>
          </select>
        </label>
        <label>
          Порядок:
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
          </select>
        </label>
      </div>
      <ul>
        {sortedVehicles.map(vehicle => (
          <li key={vehicle.id}>
            {vehicle.name} | {vehicle.model} | {vehicle.year} | {vehicle.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleList;
