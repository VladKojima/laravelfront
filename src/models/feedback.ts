export class Feedback {
    id: number;
    user_id: number;
    cafe_id: number;
    rating: number;
    comment: string;
    created_at: string;

    constructor(model: Feedback) {
        this.id = model.id;
        this.user_id = model.user_id;
        this.cafe_id = model.cafe_id;
        this.rating = model.rating;
        this.comment = model.comment;
        this.created_at = model.created_at;
    }
}