
export enum Page {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  DASHBOARD = 'DASHBOARD',
  FIELD_CENTER = 'FIELD_CENTER'
}

export interface KPI {
  label: string;
  value: number;
  color: string;
}

export interface Facility {
  id: string;
  name: string;
  location: string;
  capacity: string;
  status: 'available' | 'maintenance' | 'busy';
  icon: 'medical' | 'water' | 'security';
}
