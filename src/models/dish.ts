export enum DishTypes {
    Salads, Snacks, Hot, Desserts, Drinks
}

export enum DishTypeLabels {
    Salads = "Салаты" as any,
    Snacks = "Закуски" as any,
    Hot = "Горячие блюда" as any,
    Desserts = "Десерт" as any,
    Drinks = "Напитки" as any
}

export class Dish {
    id: number;
    image: string;
    title: string;
    weight: number;
    cost: number;
    type: DishTypes;

    constructor(model: any) {
        this.id = model.id;
        this.image = model.image;
        this.title = model.title;
        this.weight = model.weight;
        this.cost = model.cost;
        this.type = model.type;
    }
}