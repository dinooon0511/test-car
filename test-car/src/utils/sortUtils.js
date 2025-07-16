export function sortVehicles(vehicles, sortBy, order = 'asc') {
  const sorted = [...vehicles].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return order === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return order === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
}
