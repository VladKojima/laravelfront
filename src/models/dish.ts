import { getMultiple } from "../api/api";
import { route } from "../utils/decorators";

export enum DishTypes {
    SALAT, SNACK, HOT_MEAL, DESSERT, DRINK
}

export enum DishTypeLabels {
    SALAT = "Салаты" as any,
    SNACK = "Закуски" as any,
    HOT_MEAL = "Горячие блюда" as any,
    DESSERT = "Десерт" as any,
    DRINK = "Напитки" as any
}

@route({
    getAll: "/dishes"
})
export class Dish {
    id: number;
    img: string;
    title: string;
    weight: number;
    cost: number;
    type: DishTypes;

    constructor(model: any) {
        this.id = model.id;
        this.img = model.img;
        this.title = model.title;
        this.weight = model.weight;
        this.cost = model.cost;
        this.type = model.type;
    }

    static get() {
        return getMultiple(Dish) as Promise<Dish[]>;
    }
}