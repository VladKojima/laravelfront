import { post } from "../api/api";
import { route } from "../utils/decorators";

export enum Roles {
    ADMIN, EMPLOYEE, CLIENT
}

@route({
    post: "/users"
})
export class User {
    id?: number;
    username: string;
    email: string;
    password: string;
    role?: Roles;
    phone_number: string;
    date_joined?: Date;

    constructor(model: any) {
        this.id = model.id;
        this.username = model.username;
        this.email = model.email;
        this.password = model.password;
        this.role = model.role;
        this.phone_number = model.phone_number;
        this.date_joined = model.date_joined;
    }

    post() {
        return post(User, this);
    }
}