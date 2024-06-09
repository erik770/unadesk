export interface User {
  id: string;
  name: string;
  isActive: boolean;
}

export interface UserFilters {
  name: string | null;
}
