class Piramide extends Figura3d {

    constructor() {
        super();

        let l = 30;

        this.face = [

            // 0 base triangulo traseiro
            l, 0, 0,
            0, 0, 0,
            0, 0, -l,

            // 1 base triangulo esquerdo
            0, 0, -l,
            0, 0, 0,
            -l, 0, 0,

            // 2 em pé esquerdo
            -l, 0, 0,
            0, 0, -l,
            0, l, 0,

            // 3 em pé atrás
            0, 0, -l,
            l, 0, 0,
            0, l, 0,

            // 4 base direita
            l, 0, 0,
            0, 0, l,
            0, 0, 0,
            
            // 5 base frente
            0, 0, 0,
            0, 0, l,
            -l, 0, 0,

            // 6 base da frente
            -l, 0, 0,
            0, l, 0,
            0, 0, l,

            // 7 direita
            0, 0, l,
            0, l, 0,
            l, 0, 0

        ];
    }
}