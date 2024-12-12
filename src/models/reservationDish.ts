export class ReservationDish {
    reservation_id: number;
    dish_id: number;
    quantity: number;
    // price: number;

    constructor(model: ReservationDish) {
        this.reservation_id = model.reservation_id;
        this.dish_id = model.dish_id;
        this.quantity = model.quantity;
        // this.price = model.price;
    }
}