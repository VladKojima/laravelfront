import { Event } from "../models/event";
import { api } from "./api";

export const EventAgent = {
    promises: {} as {
        get?: Promise<Event[]>
    },

    get() {
        const self = EventAgent;
        if (!self.promises.get)
            self.promises.get = api.get('/events')
                .then(res => (res.data as [])
                    .map(v => new Event(v)))
                .finally(() => { delete self.promises.get });
        return self.promises.get;
    }
}