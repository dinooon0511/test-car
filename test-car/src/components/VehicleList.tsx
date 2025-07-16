import React, { useEffect, useState } from 'react';
import { fetchVehicles, updateVehicle, deleteVehicle } from '../services/vehicleService';
import { sortVehicles, Vehicle } from '../utils/sortUtils';
import VehicleEditForm from './VehicleEditForm';

const VehicleList: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'year' | 'price'>('year');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string | null>(null);

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

  const handleEdit = (id: number) => {
    setEditingId(id);
    setActionError(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setActionError(null);
  };

  const handleSaveEdit = async (updatedVehicle: Vehicle) => {
    setActionLoading(true);
    setActionError(null);
    try {
      const updated = await updateVehicle(updatedVehicle);
      setVehicles(vehicles => vehicles.map(v => v.id === updated.id ? updated : v));
      setEditingId(null);
    } catch (err: any) {
      setActionError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту машину?')) return;
    setActionLoading(true);
    setActionError(null);
    try {
      await deleteVehicle(id);
      setVehicles(vehicles => vehicles.filter(v => v.id !== id));
    } catch (err: any) {
      setActionError(err.message);
    } finally {
      setActionLoading(false);
    }
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
          <select value={sortBy} onChange={e => setSortBy(e.target.value as 'year' | 'price')} className="vehicle-select">
            <option value="year">Год</option>
            <option value="price">Цена</option>
          </select>
        </label>
        <label>
          Порядок:
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')} className="vehicle-select">
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
          </select>
        </label>
      </div>
      {actionLoading && <div className="vehicle-action-loading">Сохраняем изменения...</div>}
      {actionError && <div className="vehicle-action-error">Ошибка: {actionError}</div>}
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
