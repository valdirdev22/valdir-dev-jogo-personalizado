// Imagens das cartas
// https://www.devmedia.com.br/html5-as-tags-audio-e-video/26018



const imagens = ['./img_jose/JOSE.svg', './img_jose/Jose_2.svg', 
'./img_jose/Jose_Einstein.svg', './img_jose/Jose_valdir.svg', './img_jose/SANTO_JOSE_A.svg', 
'./img_jose/Senhora_das_Gracas.svg'];

for (let i = 1; i <= 6; i++) imagens.push(`../Bootstrap/img_jose/id/${i}/100`);
let  fundo = (`./img_jose/bola.svg`);    
/*
const fundo_img = ['./img_jose/gramado_1.svg', './img_jose/gramado_2.svg', './img_jose/gramado_3.svg',
            './img_jose/Senhora_das_Gracas.svg'];

for (let j = 1; j <= 4; j++) fundo_img.push(`../Bootstrap/img_jose/id/${j}/100`);
*/

// Estrutura do jogo
let cartas = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
let cliquesTravados = false;
let temCartaVirada = false;
let posicaoCartaVirada = -1;
let valorCartaVirada = 0;
let pontos = 0;
const timerDoJogo = new Timer('#contador'); 

onload = () => {
    
    // Carregar imagens de fundo
 

    let elemImagens = document.querySelectorAll(`#memoria img`);
    elemImagens.forEach((img, i) => {
        img.src = fundo;
        img.setAttribute('data-valor', i);
        img.style.opacity = 0.8;
    });

    // Cria o evento do botão iniciar
    document.querySelector('#btInicio').onclick = inicioJogo;

    var x = document.getElementById("sucesso");

    function playAudio() {
     x.play();
}  
};


// *****************************************************************
// INICIO DO JOGO
//******************************************************************

const inicioJogo = () => {
    // Embaralhar as cartas
     
    for (let i = 0; i < cartas.length; i++) {
        let p = Math.trunc(Math.random() * cartas.length);
        let aux = cartas[p];
        cartas[p] = cartas[i];
        cartas[i] = aux;
     
} 
document.getElementById("1").checked = true;
document.body.style.backgroundImage = "url('../Bootstrap/img_jose/gramado_1.svg')";
if (document.querySelector('#btInicio').disabled = true){
    document.querySelector('.titulo').textContent ='JOGUINHO DO JOSÉ';          

}

    // Associar eventos às imagens
    let elemImagens = document.querySelectorAll('#memoria img');
    elemImagens.forEach((img, i) => {
        img.onclick = trataCliqueImagem;
        img.style.opacity = 1;
        img.src = fundo;

    });

  // Reinicia o estado do jogo
    cliquesTravados = false;
    temCartaVirada = false;
    posicaoCartaVirada = -1;
    valorCartaVirada = 0;
    pontos = 0;
        
    // Ajuste a interface
    document.querySelector('#btInicio').disabled = true;
    document.querySelector('#btInicio').style.backgroundColor = '#FFFF00';
    document.querySelector('#contador').style.backgroundColor = '#FFFF00';     
    document.querySelector('#contador').onclick = fundo;
    timerDoJogo.start();  
};

//**********************************************
// Processa o clique na imagem
//**********************************************

const trataCliqueImagem = (e) => {
  if(cliquesTravados) return;
    const p = +e.target.getAttribute('data-valor');
    const valor = cartas[p];
    e.target.src = imagens[valor - 1];
    e.target.onclick = null;

if(!temCartaVirada) {
    temCartaVirada = true;
    posicaoCartaVirada = p;
    valorCartaVirada = valor;
} else {
    if(valor == valorCartaVirada) {
    pontos++;
} else {
      
    const p0 = posicaoCartaVirada;
    cliquesTravados = true;

    setTimeout(() => {
        e.target.src = fundo;
        e.target.onclick = trataCliqueImagem;
        console.log(p0)
       let img = document.querySelector('#memoria #i' + p0);
       img.src = fundo;
       img.onclick = trataCliqueImagem;
       cliquesTravados = false;
    }, 1500);

}
 

temCartaVirada = false;
 posicaoCartaVirada = -1;
 valorCartaVirada = 0; 
 }

    if(pontos == 6) {
        document.querySelector('#btInicio').disabled = false;
        document.querySelector('#btInicio').style.color = '#000';
        document.querySelector('#btInicio').style.backgroundColor = '#0000FF';
        document.querySelector('.titulo').textContent ='Parabéns FRANGOTE KKKKK, você ganhou!!!';  
        document.querySelector('#contador').style.backgroundColor = '#0000FF';   
        document.body.style.backgroundImage = "url('../Bootstrap/img/TIME_A.jpg')";
        timerDoJogo.stop(); 
    }     
    
};



//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// TIMER
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

// const tempo = new Timer('#timer');



function  Timer (e) {
    this.element = e;
    this.time = 0;
    this.control = null;
    this.start = () =>{
    this.time = 0;   
    this.control = setInterval(() =>{
        this.time++;
        const minutes = Math.trunc(this.time / 60);
        const seconds = this.time % 60;
        document.querySelector(this.element).innerHTML = 
        (minutes < 10 ? '0' : ' ') + minutes + ':' + (seconds < 10 ? '0' : ' ') + seconds;
    }, 1000);

};
   
this.stop = ()  => {
    clearInterval(this.control);
    this.control = null;
};

}
