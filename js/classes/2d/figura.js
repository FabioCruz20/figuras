class Figura {

    constructor() {
        this.face = [];
    }

    getFace() {
        return this.face;
    }

    getNumVertices() {
        return Math.floor(this.face.length / 3);
    }
}