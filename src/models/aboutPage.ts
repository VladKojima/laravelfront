import { getMultiple } from "../api/api";
import { route } from "../utils/decorators";

@route({
    getAll: "/about-page"
})
export class AboutPage {
    id: number;
    title: string;
    description: string;
    image_url: string;

    constructor(model: AboutPage) {
        this.id = model.id;
        this.title = model.title;
        this.description = model.description;
        this.image_url = model.image_url;
    }

    static get() {
        return getMultiple(AboutPage) as Promise<AboutPage>;
    }
}