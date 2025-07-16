import { Vehicle } from '../utils/sortUtils';

export async function fetchVehicles(): Promise<Vehicle[]> {
  const response = await fetch('https://ofc-test-01.tspb.su/test-task/vehicles');
  if (!response.ok) {
    throw new Error('Ошибка при получении списка машин');
  }
  return response.json();
}

export async function updateVehicle(vehicle: Vehicle): Promise<Vehicle> {
  const response = await fetch(`https://ofc-test-01.tspb.su/test-task/vehicles/${vehicle.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vehicle),
  });
  if (!response.ok) {
    throw new Error('Ошибка при обновлении машины');
  }
  return response.json();
}

export async function deleteVehicle(id: number): Promise<boolean> {
  const response = await fetch(`https://ofc-test-01.tspb.su/test-task/vehicles/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Ошибка при удалении машины');
  }
  return true;
}
