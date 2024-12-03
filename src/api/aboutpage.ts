import { AboutPage } from "../models/aboutPage";
import { api } from "./api"

export const AboutPageAgent = {
    promises: {} as {
        get?: Promise<AboutPage>;
    },

    get() {
        const self = AboutPageAgent;
        if (!self.promises.get)
            self.promises.get = api.get("/about-page")
                .then(res => new AboutPage(res.data))
                .finally(() => { delete self.promises.get });
        return self.promises.get;
    }
}