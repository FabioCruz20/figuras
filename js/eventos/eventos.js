/**
 * 
 * @param {{'translacao': number[], 'rotacao': number[], 'escala': number[]}} dados 
 */
function inicializaInterface(gl, tipoForma, numVertices, locais, dados) {

    // controles de translação, rotação e escala
    for (let i = 0; i < 3; i++) {
        let translacao = document.getElementById('t'+ i);
        translacao.addEventListener('input', function() {
            dados['translacao'][i] = parseFloat(translacao.value);
            desenha(gl, tipoForma, numVertices, locais, dados);
        });

        let rotacao = document.getElementById('r'+ i);
        rotacao.addEventListener('input', function() {
            dados['rotacao'][i] = parseFloat(rotacao.value);
            desenha(gl, tipoForma, numVertices, locais, dados);
        });

        let escala = document.getElementById('s'+ i);
        escala.addEventListener('input', function() {
            dados['escala'][i] = parseFloat(escala.value);
            desenha(gl, tipoForma, numVertices, locais, dados);
        });
    }

    let btnMover = document.getElementById('mover');
    btnMover.addEventListener('click', function() {
        animar(gl, tipoForma, numVertices, locais, dados);
    })

}

// botão de animação
function animar(gl, tipoForma, numVertices, locais, dados) {

    console.log('Começa a animar');
    console.log(dados);
    
    let pIni = [];
    let pFim = [];
    let sentido = [];

    for (let i = 0; i < 3; i++) {
        let pI = document.getElementById('pinicio'+ i);
        pIni.push(parseFloat(pI.value));

        let pF = document.getElementById('pfinal'+ i);
        pFim.push(parseFloat(pF.value));

        let sent = parseFloat(pF.value) < parseFloat(pI.value) ? -1 : 1;
        sentido.push(sent);
    }

    // x, y e z iniciais
    dados.translacao[0] = pIni[0];
    dados.translacao[1] = pIni[1];
    dados.translacao[2] = pIni[2];

    desenha(gl, tipoForma, numVertices, locais, dados);

    let unidade = 2; // unidade de movimentação
    // comprimentos das componentes x, y e z do percurso
    let comprX = pFim[0] - pIni[0]; 
    let comprY = pFim[1] - pIni[1];
    let comprZ = pFim[2] - pIni[2];

    // comprimento do vetor do percurso. Distância entre dois pontos
    let compr = Math.sqrt(
        Math.pow(comprX, 2) + 
        Math.pow(comprY, 2) + 
        Math.pow(comprZ, 2)
    );

    // definindo a "velocidade" a andar em cada direção
    let ptX = (comprX / compr) * unidade;
    let ptY = (comprY / compr) * unidade;
    let ptZ = (comprZ / compr) * unidade;

    // continuar desenhando
    let acabou = false;
    let k = 0;
    let idIntervalo = setInterval(() => {
        if (acabou) {
            clearInterval(idIntervalo);
        }
        acabou = true;

        let x = dados.translacao[0];
        let y = dados.translacao[1];
        let z = dados.translacao[2];
        console.log('entrou no loop');
        //console.log(x, y, z);

        //console.log(`x: ${dados.translacao[0]}; xf: ${pFim[0]}; dif: ${Math.abs(dados.translacao[0] - pFim[0])}; ptX: ${ptX}`);

        //if (dados.translacao[0] != pFim[0]) {
        if (Math.abs(dados.translacao[0] - pFim[0]) > Math.abs(ptX)) {
            //console.log(`dif > ptX: ${Math.abs(dados.translacao[0] - pFim[0]) > ptX}`)
            dados.translacao[0] += ptX;
            acabou = false;
        }
        //if (dados.translacao[1] != pFim[1]) {
        if (Math.abs(dados.translacao[1] - pFim[1]) > Math.abs(ptY)) {
            dados.translacao[1] += ptY;
            acabou = false;
        }
        //if (dados.translacao[2] != pFim[2]) {
        if (Math.abs(dados.translacao[2] - pFim[2]) > Math.abs(ptZ)) {
            dados.translacao[2] += ptZ;
            acabou = false;
        }
        desenha(gl, tipoForma, numVertices, locais, dados);

        /*
        if (dados.translacao[0] == pFim[0] && 
            dados.translacao[1] == pFim[1] &&
            dados.translacao[2] == pFim[2]) {
            
            acabou = true;
        }
        */
        /*if (
            (Math.abs(dados.translacao[0] - pFim[0]) <= ptX &&
            Math.abs(dados.translacao[1] - pFim[1]) <= ptY &&
            Math.abs(dados.translacao[2] - pFim[2]) <= ptZ)
            //|| k++ == 60
        ) {
           acabou = true;
        }*/
        
    },
    10);

    //console.log(dados);
}