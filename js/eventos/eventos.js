/**
 * 
 * @param {{'translacao': number[], 'rotacao': number[], 'escala': number[]}} dados 
 */
function inicializaInterface(gl, tipoForma, numVertices, locais, dados) {

    // controles de translação, rotação e escala
    for (let i = 0; i < 3; i++) {
        let translacao = document.getElementById('t'+ i);
        translacao.addEventListener('input', function() {
            dados['translacao'][i] = translacao.value;
            desenha(gl, tipoForma, numVertices, locais, dados);
        });

        let rotacao = document.getElementById('r'+ i);
        rotacao.addEventListener('input', function() {
            dados['rotacao'][i] = rotacao.value;
            desenha(gl, tipoForma, numVertices, locais, dados);
        });

        let escala = document.getElementById('s'+ i);
        escala.addEventListener('input', function() {
            dados['escala'][i] = escala.value;
            desenha(gl, tipoForma, numVertices, locais, dados);
        });
    }

}
