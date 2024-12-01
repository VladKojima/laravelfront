import { Event } from "../models/event";
import { getMultipleWithMapper } from "./api";

export function getEvents(): Promise<Event[]> {
    return Promise.resolve([
        new Event({id: 10, name: "Birthday"}),
        new Event({id: 1, name: "Corporate"}),
        new Event({id: 3, name: "Wedding"}),
        new Event({id: 6, name: "Event"}),
    ])

    //
    return getMultipleWithMapper("/events", Event);
}