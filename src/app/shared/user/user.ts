export interface User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    passwordCheck?: string;
    birth: Date;
}
