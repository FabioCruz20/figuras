class Triangulo3d extends Figura3d {

    constructor() {
        super();

        this.face = [
            // face lateral 1
            0, 0, 0,
            30, 0, 0,
            0, 30, 0, 

            // face lateral 2
            0, 0, 10,
            30, 0, 10,
            0, 30, 10,

            // face frontal 1
            0, 30, 10,
            30, 0, 10,
            30, 0, 0,

            // face frontal 2
            30, 0, 0,
            0, 30, 0,
            0, 30, 10,

            // face traseira 1
            0, 0, 0,
            0, 0, 10,
            0, 30, 10,

            // face traseira 2
            0, 30, 10,
            0, 30, 0,
            0, 0, 0,

            // face de cima 1
            0, 0, 0,
            30, 0, 0,
            30, 0, 10,

            // face de cima 2
            30, 0, 10,
            0, 0, 30,
            0, 0, 0


        ];
    }
}