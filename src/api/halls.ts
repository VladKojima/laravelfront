import { Hall } from "../models/hall";
import { getMultipleWithMapper } from "./api";

export function getHalls(): Promise<Hall[]> {
    return Promise.resolve([
        new Hall({ id: 10, name: "New Hall", capacity: 10, description: "SHHHIiaza"}),
        new Hall({ id: 1, name: "Old Hall", capacity: 20, description: "sasall" }),
    ]);

    //
    return getMultipleWithMapper("/halls", Hall);
}