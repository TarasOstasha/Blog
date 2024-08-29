export interface HeaderProps {
  userName: string | undefined;
  setAuthData: (token: MyToken) => void;
  logOut: () => void;
}

export interface MyToken {
  id: number;
  name: string;
  email: string;
  exp: number;
  iat: number;
}
