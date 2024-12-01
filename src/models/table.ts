export class Table {
    id: number;
    hall_id: number;
    table_number: number;
    capacity: number;
    is_available: boolean;

    constructor(model: Table) {
        this.id = model.id;
        this.hall_id = model.hall_id;
        this.table_number = model.table_number;
        this.capacity = model.capacity;
        this.is_available = model.is_available;
    }
}