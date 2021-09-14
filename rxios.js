class Rxios {
    constructor() {

    }
    async _rxios(api, method, data) {
        try {
            const request = await fetch(api, {
                method: method,
                body: data
            });
            const response = await request.json();
            return response;
        } catch (e) {
            console.error(e);
        }

    }
    async get(url) {
        return await this._rxios(url, "GET");
    }
    async post(url, data) {
        return await this._rxios(url, "POST", data);
    }
}

class Api {
    constructor() {
        this.rxios = new Rxios();
        this._url = "https://isa-myblog.herokuapp.com/post/";
    }
    async getTags() {
        const result = await this.rxios.get(`${this._url}tags`);
        console.log(result);
    }
}

const api = new Api();
api.getTags();
