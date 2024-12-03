import { Hall } from "../models/hall";
import { api } from "./api";

export const HallAgent = {
    promises: {} as {
        get?: Promise<Hall[]>
    },

    get() {
        const self = HallAgent;
        if (!self.promises.get)
            self.promises.get = api.get("/halls")
                .then(res => (res.data as [])
                    .map(v => new Hall(v)))
                .finally(() => { delete self.promises.get });
        return self.promises.get;
    }
}