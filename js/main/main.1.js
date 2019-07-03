function main() {
    const canvas = document.getElementById('canvas');
    const gl = canvas.getContext('webgl');

    if (!gl) {
        alert('WebGL não é suportado');
        return;
    }

    // cria o programa glsl
    const program = preparaPrograma(gl, 'vertex-shader', 'fragment-shader');

    // buff de dados
    locais = buscaLocalizacoes(gl, program, ['a_position'], ['u_resolution', 
        'u_matrix_escala', 'u_matrix_translacao']);

    
    let positionBuffer = criaBuffer(gl);

    // carrega o buffer com as coordenadas (x, y, z) iniciais do triângulo
    /*
    let t1 = new Triangulo();
    carregaBuffer(gl, positionBuffer, t1.getFace());
    */

    // configura display
    configuraDisplay(gl);
    
    // usa o programa
    usaPrograma(gl, program);

    // configura a passagem de dados para o attributo no programa glsl
    configuraAttrib(gl, locais['attribs'][0], positionBuffer);

    let matrizEscala = [
        2, 0, 0,
        0, 2, 0,
        0, 0, 2
    ];
    let matrizTranslacao = [
        1, 0, 0,
        0, 1, 0,
        30, 30, 1
    ];
    // configura as matrizes de transformação para o prog glsl
    configuraMatrizUniform(gl, locais['uniforms'][1], matrizEscala);
    configuraMatrizUniform(gl, locais['uniforms'][2], matrizTranslacao);
    
    // configura a resolução no programa glsl
    configuraResolucaoUniform(gl, locais['uniforms'][0]);

    // carrega o buffer com as coordenadas (x, y, z) iniciais do triangulo
    let t1 = new Triangulo();
    carregaBuffer(gl, positionBuffer, t1.getFace());

    // desenha
    //desenha(gl, gl.LINE_LOOP, 3);
    desenha(gl, gl.TRIANGLES, t1.getNumVertices());
}
