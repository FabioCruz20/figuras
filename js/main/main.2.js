function main() {
    const canvas = document.getElementById('canvas');
    const gl = canvas.getContext('webgl');

    if (!gl) {
        alert('WebGL não é suportado');
        return;
    }

    let t1 = new Triangulo();
    // configuração inicial do webgl
    locais = setup(gl, t1);

    let transf = {
        'translacao': [100, 30],
        'escala': [2, 2],
        'rotacao': [Math.PI]
    };

    // desenha
    desenha(gl, gl.TRIANGLES, t1.getNumVertices(), locais, transf);
}
