// export interface AuthData {
//     name: string,
//     email: string,
//     password: string,
//     confirmPassword: string
// }
// Define component props
export interface AuthProps {
  authData: AuthData;
  isFetching: boolean;
  error: string | null;
  getUser: (id: string) => void;
  loginUser: (email: string, password: string) => void;
  signupUser: (name: string, email: string, password: string) => void;
}
export interface AuthData {
  //id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
export interface LoginData {
  name: string;
  email: string;
}
// export interface AuthState {
//   authData: AuthData[] | null; // AuthData if logged in, null if not
//   isFetching: boolean;
//   error: string | null;
// }
export interface AuthState {
  authData: AuthData[]; // An array to hold multiple users
  isFetching: boolean;
  error: string | null;
}
