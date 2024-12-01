export class Event {
    id: number;
    hall_id?: number;
    name: string;
    description?: string;
    start_time?: Date;
    end_time?: Date;
    is_public?: boolean;

    constructor(model: Event) {
        this.id = model.id;
        this.hall_id = model.hall_id;
        this.name = model.name;
        this.description = model.description;
        this.start_time = model.start_time;
        this.end_time = model.end_time;
        this.is_public = model.is_public;
    }
}