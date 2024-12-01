export class Promotion {
    id: number;
    name: string;
    description: string;
    discount_percentage: number;
    start_date: Date;
    end_date: Date;
    hall_id: number;
    is_active: boolean;

    constructor(model: Promotion) {
        this.id = model.id;
        this.name = model.name;
        this.description = model.description;
        this.discount_percentage = model.discount_percentage;
        this.start_date = model.start_date;
        this.end_date = model.end_date;
        this.hall_id = model.hall_id;
        this.is_active = model.is_active;
    }
}