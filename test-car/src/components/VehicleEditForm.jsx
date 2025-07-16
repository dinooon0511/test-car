import React, { useState } from 'react';

const VehicleEditForm = ({ vehicle, onSave, onCancel }) => {
  const [name, setName] = useState(vehicle.name);
  const [price, setPrice] = useState(vehicle.price);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...vehicle, name, price });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Название"
        required
      />
      <input
        type="number"
        value={price}
        onChange={e => setPrice(Number(e.target.value))}
        placeholder="Цена"
        required
        style={{ marginLeft: 8 }}
      />
      <button type="submit" style={{ marginLeft: 8 }}>Сохранить</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Отмена</button>
    </form>
  );
};

export default VehicleEditForm;
