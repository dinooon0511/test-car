export interface Vehicle {
  id: number;
  name: string;
  model: string;
  year: number;
  price: number;
  latitude?: number;
  longitude?: number;
}

export function sortVehicles(
  vehicles: Vehicle[],
  sortBy: 'year' | 'price',
  order: 'asc' | 'desc' = 'asc'
): Vehicle[] {
  const sorted = [...vehicles].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return order === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return order === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
}
