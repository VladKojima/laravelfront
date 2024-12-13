import { Reservation } from "../models/reservation"
import { api } from "./api"

export const ReservationAgent = {
    promises: {} as {
        post?: Promise<any>
    },

    post(reservation: Reservation) {
        const self = ReservationAgent;
        if (!self.promises.post)
            self.promises.post = api.post("/reservations", reservation).then(res => res.data)
                .finally(() => { delete self.promises.post });
        return self.promises.post;
    }
}