import { Dish, DishTypes } from "../models/dish";
import { getMultipleWithMapper } from "./api";

export function getDishes(): Promise<Dish[]> {
    const dishes = new Array(40).fill(() => { }).map(() => {
        const type = DishTypes[Math.floor(Math.random() * Object.keys(DishTypes).length / 2)] as unknown as DishTypes;

        return new Dish({
            id: Math.round(Math.random() * 10000),
            img: "/logo512.png",
            cost: Math.round(Math.random() * 2000 + 300),
            title: type + " " + crypto.randomUUID(),
            weight: Math.round(Math.random() * 800 + 100),
            type: type
        })
    }
    );

    return Promise.resolve(dishes);

    //
    return getMultipleWithMapper("/dishes", Dish);
}