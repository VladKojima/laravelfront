export class Hall {
    id: number;
    name: string;
    capacity: number;
    description: string;
    img?: string;
    schemeImg: string;

    constructor(model: Hall) {
        this.id = model.id;
        this.name = model.name;
        this.capacity = model.capacity;
        this.description = model.description;
        this.img = model.img
        this.schemeImg = model.schemeImg;
    }
}