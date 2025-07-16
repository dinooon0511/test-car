import React, { useState } from 'react';

const VehicleEditForm = ({ vehicle, onSave, onCancel }) => {
  const [name, setName] = useState(vehicle.name);
  const [price, setPrice] = useState(vehicle.price);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...vehicle, name, price });
  };

  return (
    <form onSubmit={handleSubmit} className="vehicle-edit-form">
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Название"
        required
        className="vehicle-input"
      />
      <input
        type="number"
        value={price}
        onChange={e => setPrice(Number(e.target.value))}
        placeholder="Цена"
        required
        className="vehicle-input"
      />
      <button type="submit" className="vehicle-btn vehicle-btn-save">Сохранить</button>
      <button type="button" onClick={onCancel} className="vehicle-btn vehicle-btn-cancel">Отмена</button>
    </form>
  );
};

export default VehicleEditForm;
