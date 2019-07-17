class Figura3d {

    constructor() {
        this.face = [];
        this.cor = [];
    }

    getNumVertices() {
        return Math.floor(this.face.length / 3);
    }

    getFace() {
        return this.face;
    }

    getCor() {
        return this.cor;
    }
}