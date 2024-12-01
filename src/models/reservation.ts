export enum ReservationStates {
    ACTIVE, CANCELED, DONE
}

export enum ReservationTypes {
    COMMON, BIRTHDAY
}

export class Reservation {
    id?: number;
    user_id?: number;
    table_id?: number;
    hall_id?: number;
    reservation_date: string;
    start_time: string;
    end_time: string;
    state?: ReservationStates;
    guests_count: number;
    special_requests?: ReservationTypes;

    constructor(model: Reservation) {
        this.id = model.id;
        this.user_id = model.user_id;
        this.table_id = model.table_id;
        this.hall_id = model.hall_id;
        this.reservation_date = model.reservation_date;
        this.start_time = model.start_time;
        this.end_time = model.end_time;
        this.state = model.state;
        this.guests_count = model.guests_count;
        this.special_requests = model.special_requests;
    }
}