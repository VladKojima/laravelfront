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
}