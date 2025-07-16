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
    <div className="vehicle-app-container">
      <h2 className="vehicle-title">Список машин</h2>
      <div className="vehicle-sort-panel">
        <label>
          Сортировать по:
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="vehicle-select">
            <option value="year">Год</option>
            <option value="price">Цена</option>
          </select>
        </label>
        <label>
          Порядок:
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="vehicle-select">
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
          </select>
        </label>
      </div>
      {loading && <div className="vehicle-action-loading">Сохраняем изменения...</div>}
      {error && <div className="vehicle-action-error">Ошибка: {error}</div>}
      <ul className="vehicle-list">
        {sortedVehicles.map(vehicle => (
          <li key={vehicle.id} className="vehicle-list-item">
            {editingId === vehicle.id ? (
              <VehicleEditForm
                vehicle={vehicle}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
              />
            ) : (
              <>
                <span className="vehicle-info">{vehicle.name} | {vehicle.model} | {vehicle.year} | {vehicle.price}</span>
                <button className="vehicle-btn vehicle-btn-edit" onClick={() => handleEdit(vehicle.id)}>Редактировать</button>
                <button className="vehicle-btn vehicle-btn-delete" onClick={() => handleDelete(vehicle.id)}>Удалить</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleList;
