// Clean Wallpapers Data - All wallpapers are fetched dynamically from the Spring Boot backend
export const CATEGORIES = [
  { id: 'all', label: 'All Works' },
];

export const DEVICE_OPTIONS = [
  { id: 'windows', label: 'Windows', icon: 'monitor' },
  { id: 'mac', label: 'Mac', icon: 'laptop' },
  { id: 'android', label: 'Android', icon: 'smartphone' },
];

// No mock data - fetched 100% from backend GET /api/wallpapers
export const WALLPAPERS = [];
