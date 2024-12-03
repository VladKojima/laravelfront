import { User } from "../models/user";
import { api } from "./api";

export const UserAgent = {
    promises: {} as {
        save?: Promise<any>
    },

    save(user: User) {
        const self = UserAgent;
        if (!self.promises.save)
            self.promises.save = api.post("/users", user)
                .finally(() => { delete self.promises.save });
        return self.promises.save;
    }
}