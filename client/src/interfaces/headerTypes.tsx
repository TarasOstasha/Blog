export interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface HeaderProps {
  userData: UserData | null;
}
