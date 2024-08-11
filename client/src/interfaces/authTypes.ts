export interface AuthData {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}
// Define component props
export interface AuthProps {
    authData: AuthData;
    isFetching: boolean;
    error: string | null;
    getUser: (id: string) => void;
    loginUser: (email:string, password:string) => void;
    signupUser: (name:string,email:string,password:string) => void;
}