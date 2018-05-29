export interface User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    passwordCheck?: string;
    birth: Date;
}
export interface UserInfo {
    id: string;
    firstname: string;
    lastname: string;
}
