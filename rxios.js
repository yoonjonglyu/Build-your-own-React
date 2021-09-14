class Rxios {
    constructor() {
        this._url = "https://isa-myblog.herokuapp.com/post/";
    }
    async _rxios(api) {
        try {
            const response = await fetch(api);
            const data = await response.json();
            return data;
        } catch (e) {
            console.error(e);
        }

    }
    async getTags() {
        const result = await this._rxios(`${this._url}tags`);
        console.log(result);
    }
}

const api = new Rxios();
api.getTags();
