function main() {
    const canvas = document.getElementById('canvas');
    const gl = canvas.getContext('webgl');

    if (!gl) {
        alert('WebGL não é suportado');
        return;
    }

    let t1 = new Tetraedro();
    // configuração inicial do webgl
    locais = setup(gl, t1);

    let transf = {
        'translacao': [0, 0, -500],
        'escala': [1, 1, 1],
        'rotacao': [0, 0, 0]
    };

    inicializaInterface(gl, gl.TRIANGLES, t1.getNumVertices(), locais, transf);

    // desenha
    desenha(gl, gl.TRIANGLES, t1.getNumVertices(), locais, transf);
}
