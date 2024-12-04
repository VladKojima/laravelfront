export class Table {
    id: number;
    hall_id: number;
    table_number: number;
    capacity: number;
    is_available: boolean;
    x: number;
    y: number;

    constructor(model: Table) {
        this.id = model.id;
        this.hall_id = model.hall_id;
        this.table_number = model.table_number;
        this.capacity = model.capacity;
        this.is_available = model.is_available;
        this.x = model.x;
        this.y = model.y;
    }
}