class Figura3d {

    constructor() {
        this.face = [];
    }

    getNumVertices() {
        return Math.floor(this.face.length / 3);
    }

    getFace() {
        return this.face;
    }
}