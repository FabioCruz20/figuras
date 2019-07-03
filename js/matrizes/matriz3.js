const m3 = {
    translacao(x, y) {
        return [
            1, 0, 0,
            0, 1, 0,
            x, y, 1
        ];
    },

    escalonamento(x, y) {
        return [
            x, 0, 0,
            0, y, 0,
            0, 0, 1
        ];
    },

    rotacao(angRad) {
        let s = Math.sin(angRad);
        let c = Math.cos(angRad);

        return [
            c,  s, 0,
            -s, c, 0,
            0,  0, 1
        ];
    },

    projecao(larg, alt) {
        let l = 2 / larg;
        let a = -2 / alt;

        return [
             l, 0, 0,
             0, a, 0,
            -1, 1, 1
        ];
    }
}