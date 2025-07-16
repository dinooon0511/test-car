export async function fetchVehicles() {
  const response = await fetch('https://ofc-test-01.tspb.su/test-task/vehicles');
  if (!response.ok) {
    throw new Error('Ошибка при получении списка машин');
  }
  return response.json();
}
