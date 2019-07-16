/**
 * 1
 * @param {*} gl 
 * @param {*} tipo 
 * @param {*} fonte 
 */
function createShader(gl, tipo, fonte) {
    let shader = gl.createShader(tipo);
    gl.shaderSource(shader, fonte);
    gl.compileShader(shader);

    let sucesso = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (sucesso) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

/**
 * 2
 * @param {*} gl 
 * @param {*} vertexShader 
 * @param {*} fragmentShader 
 */
function createProgram(gl, vertexShader, fragmentShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    let sucesso = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (sucesso) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

function preparaPrograma(gl, idVertex, idFragment) {
    let fonteVertex = document.getElementById(idVertex).text;
    let fonteFragment = document.getElementById(idFragment).text;

    let vertexShader = createShader(gl, gl.VERTEX_SHADER, fonteVertex);
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fonteFragment);

    let programa = createProgram(gl, vertexShader, fragmentShader);

    return programa;
}

/**
 * 4
 * @param {*} gl 
 * @param {*} programa 
 * @param {*} nomesAttribs 
 * @param {*} nomesUniforms 
 */
function buscaLocalizacoes(gl, programa, nomesAttribs, nomesUniforms) {
    let locs = {'attribs': [], 'uniforms': []};

    // busca os atributos
    for (let i = 0; i < nomesAttribs.length; i++) {
        let localizacaoAttrib = gl.getAttribLocation(programa, nomesAttribs[i]);
        locs['attribs'].push(localizacaoAttrib);
    }

    // busca os uniforms
    for (let i = 0; i < nomesUniforms.length; i++) {
        let localizacaoUniform = gl.getUniformLocation(programa, nomesUniforms[i]);
        locs['uniforms'].push(localizacaoUniform);
    }

    return locs;
}

/**
 * 5
 * @param {*} gl 
 */
function criaBuffer(gl) {
    return gl.createBuffer();
}

/**
 * 6
 * @param {*} gl 
 * @param {*} buffer 
 * @param {*} dados 
 */
function carregaBuffer(gl, buffer, TipoDados, dados) {

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new TipoDados(dados), gl.STATIC_DRAW);
}

/**
 * 7
 * @param {*} gl 
 */
function configuraDisplay(gl) {

    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    // z-buffer
    gl.clear(gl.BUFFER_COLOR_BIT | gl.DEPTH_BUFFER_BIT); // limpa o canvas
    gl.enable(gl.CULL_FACE); // não desenha triângulos da face traseira
    gl.enable(gl.DEPTH_TEST); // habilita z-buffer
}

/**
 * 8
 * @param {*} gl 
 * @param {*} programa 
 */
function usaPrograma(gl, programa) {
    gl.useProgram(programa);
}

/**
 * 9
 * @param {*} gl 
 * @param {*} localAttrib 
 * @param {*} buffer 
 * @param {*} tamanho 
 * @param {*} tipo 
 * @param {*} normaliza 
 * @param {*} passo 
 * @param {*} deslocamento 
 */
function configuraAttrib(gl, localAttrib, buffer, tamanho=3, 
    tipo=gl.FLOAT, normaliza=false, passo=0, deslocamento=0) {
    
    gl.enableVertexAttribArray(localAttrib);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(localAttrib, tamanho, tipo, normaliza, passo, deslocamento);
}

/**
 * 10
 * @param {*} gl 
 * @param {*} localUniform 
 */
function configuraResolucaoUniform(gl, localUniform) {
    gl.uniform2f(localUniform, gl.canvas.width, gl.canvas.height);
}

/**
 * 11
 * @param {*} gl 
 * @param {*} localUniform 
 * @param {*} matriz 
 */
function configuraMatrizUniform(gl, localUniform, matriz) {
    gl.uniformMatrix4fv(localUniform, false, matriz);
}

/**
 * 
 * @param {*} gl 
 * @param {*} localUniform 
 * @param {*} vetor 
 */
function configuraVetorUniform(gl, localUniform, vetor) {
    gl.uniform4fv(localUniform, vetor);
}

function configuraFloatUniform(gl, localUniform, valor) {
    gl.uniform1f(localUniform, valor);
}

/**
 * 12
 * @param {*} gl 
 * @param {*} tipoForma 
 * @param {*} numVertices 
 */
/*
function desenha(gl, tipoForma=gl.TRIANGLES, numVertices) {
    gl.drawArrays(tipoForma, 0, numVertices);
}
*/

/**
 * 13 - main
 * @param {*} gl 
 */
function setup(gl, figura) {
    // cria o programa glsl
    const program = preparaPrograma(gl, 'vertex-shader', 'fragment-shader');

    // buff de dados
    locais = buscaLocalizacoes(gl, program, ['a_position', 'a_color'], ['u_resolution', 
        'u_matrix_escala', 'u_matrix_translacao', 'u_matrix_rotacao_x', 
        'u_matrix_rotacao_y', 'u_matrix_rotacao_z', 'u_matrix_projecao', 
        'ang_x', 'ang_y', 'ang_z']);


    let positionBuffer = criaBuffer(gl);

    // carrega o buffer com as coordenadas (x, y, z) iniciais do triângulo
    /*
    //let t1 = new Triangulo();
    carregaBuffer(gl, positionBuffer, t1.getFace());
    */
    carregaBuffer(gl, positionBuffer, Float32Array, figura.getFace());

    // carrega o buffer de cores da figura
    let colorBuffer = criaBuffer(gl);
    carregaBuffer(gl, colorBuffer, Uint8Array, figura.getCor());

    // configura display
    configuraDisplay(gl);

    // usa o programa
    usaPrograma(gl, program);

    // configura a passagem de dados para o attributo no programa glsl
    configuraAttrib(gl, locais['attribs'][0], positionBuffer);
    configuraAttrib(gl, locais['attribs'][1], colorBuffer, 3, gl.UNSIGNED_BYTE, true);

    // configura a resolução no programa glsl
    configuraResolucaoUniform(gl, locais['uniforms'][0]);

    return locais;
}


function desenha(gl, tipoForma=gl.LINE_LOOP, numVertices, locais,
    transf) {

    let sx = transf.escala[0];
    let sy = transf.escala[1];
    let sz = transf.escala[2];

    let tx = transf.translacao[0];
    let ty = transf.translacao[1];
    let tz = transf.translacao[2];

    let angRadX = transf.rotacao[0];
    let angRadY = transf.rotacao[1];
    let angRadZ = transf.rotacao[2];

    let matrizEscala = m4.escalonamento(sx, sy, sz);
    let matrizTranslacao = m4.translacao(tx, ty, tz);
    let matrizRotacaoX = m4.rotacaoX(angRadX);
    let matrizRotacaoY = m4.rotacaoY(angRadY);
    let matrizRotacaoZ = m4.rotacaoZ(angRadZ);
    //let matrizProjecao = m4.projecao(gl.canvas.clientWidth, gl.canvas.clientHeight, 400);
    let aspecto = gl.canvas.clientWidth / gl.canvas.clientHeight;
    let zNear = 1;
    let zFar = 2000;
    let campoVisaoRad = 60 * Math.PI / 180;
    let matrizProjecao = m4.perspectiva(campoVisaoRad, aspecto, zNear, zFar);

    configuraMatrizUniform(gl, locais['uniforms'][1], matrizEscala);
    configuraMatrizUniform(gl, locais['uniforms'][2], matrizTranslacao);
    configuraMatrizUniform(gl, locais['uniforms'][3], matrizRotacaoX);
    configuraMatrizUniform(gl, locais['uniforms'][4], matrizRotacaoY);
    configuraMatrizUniform(gl, locais['uniforms'][5], matrizRotacaoZ);
    configuraMatrizUniform(gl, locais['uniforms'][6], matrizProjecao);
    configuraFloatUniform(gl, locais['uniforms'][7], angRadX);
    configuraFloatUniform(gl, locais['uniforms'][8], angRadY);
    configuraFloatUniform(gl, locais['uniforms'][9], angRadZ);
    
    gl.drawArrays(tipoForma, 0, numVertices);
}
