export class Payment {
    id: number;
    reservation_id: number;
    amount: number;
    payment_status: any;
    payment_date: Date;
    payment_method: any;

    constructor(model: Payment) {
        this.id = model.id;
        this.reservation_id = model.reservation_id;
        this.amount = model.amount;
        this.payment_date = model.payment_date;
    }
}