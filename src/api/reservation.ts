import { Reservation } from "../models/reservation"
import { api } from "./api"

export const ReservationAgent = {
    promises: {} as {
        post?: Promise<any>
    },

    post(reservation: Reservation) {
        const self = ReservationAgent;
        if (!self.promises.post)
            self.promises.post = api.post("/reservations", reservation)
                .finally(() => { delete self.promises.post });
        return self.promises.post;
    }
}