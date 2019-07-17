const m4 = {
    translacao(x, y, z) {
        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            x, y, z, 1
        ];
    },

    escalonamento(x, y, z) {
        return [
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1
        ];
    },

    rotacaoX(angRad) {
        let s = Math.sin(angRad);
        let c = Math.cos(angRad);

        return [
            1,  0, 0, 0,
            0,  c, s, 0,
            0, -s, c, 0,
            0,  0, 0, 1
        ];
    },

    rotacaoY(angRad) {
        let s = Math.sin(angRad);
        let c = Math.cos(angRad);

        return [
            c, 0, -s, 0,
            0, 1,  0, 0,
            s, 0,  c, 0,
            0, 0,  0, 1
        ];
    },

    rotacaoZ(angRad) {
        let s = Math.sin(angRad);
        let c = Math.cos(angRad);

        return [
             c, s, 0, 0,
            -s, c, 0, 0,
             0, 0, 1, 0,
             0, 0, 0, 1
        ];
    },

    projecao(larg, alt, prof) {
        let l = 2 / larg;
        let a = -2 / alt;
        let p = 2 / prof;

        return [
             l, 0, 0, 0,
             0, a, 0, 0,
             0, 0, p, 0,
            -1, 1, 0, 1
        ];
    },

    perspectiva(campoVisaoRad, aspecto, near, far) {
        let f = Math.tan(Math.PI * 0.5 - 0.5 * campoVisaoRad);
        let intervaloInverso = 1.0 / (near - far);

        return [
            f / aspecto, 0, 0,                                0,
            0,           f, 0,                                0,
            0,           0, (near + far) * intervaloInverso, -1,
            0,           0, near * far * intervaloInverso * 2, 0
        ];
    }
}