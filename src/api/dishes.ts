import { Dish } from "../models/dish";
import { api } from "./api";

export const DishAgent = {
    promises: {} as {
        get?: Promise<Dish[]>
    },

    get() {
        const self = DishAgent;
        if (!self.promises.get) {
            self.promises.get = api.get("/dishes")
                .then(res => (res.data as [])
                    .map(v => new Dish(v)))
                .finally(() => { delete self.promises.get });
        }
        return self.promises["get"];
    }
}