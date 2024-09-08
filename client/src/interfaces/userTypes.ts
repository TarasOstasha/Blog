import { FetchError } from './carouselTypes';

export interface UserListProps {
  users: User[];
  isFetching: boolean;
  error: FetchError | null;
  getUsers: () => (limit: number, offset: number) => void;
  updateUserRole: (id: string, role: string) => void;
  deleteUser: (id: string) => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface UpdateUserRolePayload {
  id: string;
  role: string;
}

export interface UsersState {
  users: User[];
  isFetching: boolean;
  error: FetchError | null;
  totalCount: number;
}
