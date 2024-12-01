export class BonusPoints {
    id: number;
    user_id: number;
    points: number;
    expiration_date: Date;

    constructor(model: BonusPoints) {
        this.id = model.id;
        this.user_id = model.user_id;
        this.points = model.points;
        this.expiration_date = model.expiration_date;
    }
}