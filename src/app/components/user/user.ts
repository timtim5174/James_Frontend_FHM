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
    lastname: string;
    firstname: string;
    email: string;
}
