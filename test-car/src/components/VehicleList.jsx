import React, { useEffect, useState } from 'react';
import { fetchVehicles } from '../services/vehicleService';
import { sortVehicles } from '../utils/sortUtils';
import VehicleEditForm from './VehicleEditForm';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('year');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editingId, setEditingId] = useState(null);

  const handleDelete = (id) => {
    setVehicles(vehicles => vehicles.filter(v => v.id !== id));
  };

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

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = (updatedVehicle) => {
    setVehicles(vehicles => vehicles.map(v => v.id === updatedVehicle.id ? updatedVehicle : v));
    setEditingId(null);
  };

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
            {editingId === vehicle.id ? (
              <VehicleEditForm
                vehicle={vehicle}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
              />
            ) : (
              <>
                {vehicle.name} | {vehicle.model} | {vehicle.year} | {vehicle.price}
                <button style={{ marginLeft: 8 }} onClick={() => handleEdit(vehicle.id)}>Редактировать</button>
                <button style={{ marginLeft: 8 }} onClick={() => handleDelete(vehicle.id)}>Удалить</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleList;
