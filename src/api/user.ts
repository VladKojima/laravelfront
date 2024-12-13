import { User } from "../models/user";
import { api } from "./api";

export const UserAgent = {
    promises: {} as {
        register?: Promise<any>;
        login?: Promise<any>;
    },

    register(user: User) {
        const self = UserAgent;
        if (!self.promises.register)
            self.promises.register = api.post("/register", user)
                .finally(() => { delete self.promises.register });
        return self.promises.register;
    },

    login(user: User) {
        const self = UserAgent;
        if (!self.promises.login)
            self.promises.login = api.post("/login", user)
                .finally(() => { delete self.promises.login });
        return self.promises.login;
    }
}