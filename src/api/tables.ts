import { Table } from "../models/table";
import { api } from "./api";

export const TableAgent = {
    promises: {} as {
        get?: Promise<Table[]>
    },

    get() {
        const self = TableAgent;
        if (!self.promises.get)
            self.promises.get = api.get("/tables")
                .then(res => (res.data as [])
                    .map(v => new Table(v)))
                .finally(() => { delete self.promises.get });
        return self.promises.get;
    }
}