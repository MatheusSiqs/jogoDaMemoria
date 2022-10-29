var temp = null;
var ctempo = null;
var cTimeout = null
var tamanho = null;
var trapaca = 0;
var jaEscolheu = 0;
var modo = null;
var acertos = 0;

function start(){
	let query = window.location.search;
	let info = new URLSearchParams(query);
	tamanho = info.get('tamanho');
	modo = info.get('modo');
	var cartas = makeCards();
		
	shuffleArray(cartas);
	criaTabuleiro(cartas);
  if(modo == 'temp'){
    inicializaTimer();
  }
  /*-------------------------------------------------------------
    Adiciona Triggers
  -------------------------------------------------------------*/

  let dis = document.getElementById("desistir");
  dis.addEventListener("click",desistir,"false");

  let trap = document.getElementById("trapaca");
  trap.addEventListener("click",ativaTrapaca,"false");
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function makeCards(){
	let numCarta = (tamanho/2)*tamanho;
  childs = numCarta;
	let cartas=[];
	
	
	for(let i = 0;i<numCarta;i++){
		cartas.push(i);
		cartas.push(i);
	}
	return cartas;
}

function criaTabuleiro(cartas){
	let tbl = document.getElementById("jogo");
	let cons = 0;
	let num = 0;
	
	for(let i = 0; i<tamanho;i++){
		let row = document.createElement("tr");
		for(let k = 0;k<tamanho;k++){
			let dados = document.createElement("td");
			let frente = document.createElement("img");
			let costa = document.createElement("img");
			let inner = document.createElement("div");
			let front = document.createElement("div");
			let back = document.createElement("div");
			
			
			inner.classList.add("carta_inner");
			
			front.classList.add("carta_frente");
			
			back.classList.add("carta_costa");
			
			dados.classList.add("carta");
			
			
			
			frente.setAttribute("src","Pares/costa.jpg");
			
			costa.setAttribute("src","Pares/Par"+cartas[cons+k]+".gif");
			
			frente.name="Carta"+cartas[cons+k];
			frente.id="C"+num;
			
			costa.name="costa"
			
			dados.addEventListener("click",verificaParidade,"false");
			
			
			back.appendChild(costa);
			front.appendChild(frente);
			
			inner.appendChild(front);
			inner.appendChild(back);
			
			dados.appendChild(inner);
			row.appendChild(dados);
			num++;
		}
		tbl.appendChild(row);
		cons+=parseInt(tamanho,10);
	}
}

function verificaParidade(event){
	let carta = document.getElementById(event.target.id);
  let ponto = document.getElementById("pontos")
  let Patual = parseInt(ponto.innerHTML,10)

  if(!jaEscolheu && modo == 'temp'){
    criaTimer(tamanho);
    jaEscolheu = 1;
  }

	if((carta.name != null) && (carta.name != "costa")){
		flipCarta(event.target.id)
		if(temp == null){
			temp = [carta.name,carta.id]
		}else{
			if(temp[0] == carta.name){
				temp = null;
        ponto.innerHTML=Patual+1;
        setTimeout(verificaVitoria,701);
			}else{
				let par = document.getElementById(temp[1])
				deFlipCarta(event.target.id);
				deFlipCarta(temp[1]);
        ponto.innerHTML=Patual+1;
				temp = null;
			}
		}		
	}
}

function flipCarta(id){
	let carta = document.getElementById(id)
	carta.parentNode.parentNode.animate([
			{transform:'rotateY(0deg)'},
			{transform:'rotateY(180deg)'}
		],{duration:700})
		carta.parentNode.parentNode.classList.add("carta_rodada");
}

function deFlipCarta(id){
	let carta = document.getElementById(id)
	
	carta.parentNode.parentNode.animate([
		{transform:'rotateY(180deg)'},
		{transform:'rotateY(0deg)'}
		],{duration:700})
	carta.parentNode.parentNode.classList.remove("carta_rodada");
		
}

function criaTimer(){
  switch(tamanho){
    case '2':
      ctempo = setInterval(reduzTimer,1000);
      cTimeout = setTimeout(finalizaJogo,20*1000);
      break;

    case '4':
      ctempo = setInterval(reduzTimer,1000);
      cTimeout = setTimeout(finalizaJogo,60*1000);
      break;

    case '6':
      ctempo = setInterval(reduzTimer,1000);
      cTimeout = setTimeout(finalizaJogo,90*1000);
      break;

    case '8':
      ctempo = setInterval(reduzTimer,1000);
      cTimeout = setTimeout(finalizaJogo,120*1000);
     
      break;
  }
}

function finalizaJogo(){
  clearInterval(ctempo);
  if(confirm("Você perdeu.\nDeseja jogar novamente?")){
    document.location.reload()
  }else{
    window.open("../Ejogo/Ejogo.html","_self");
  }
}

function reduzTimer(){
  let t = document.getElementById("Timer");
  let tAtual = parseInt(t.innerHTML,10);
  t.innerHTML=tAtual-1;
}

function desistir(){
  if(confirm("Você realmente dejesa sair?")){
    window.open("../Ejogo/Ejogo.html","_self");
  }
}

function ativaTrapaca(){
  if(!trapaca){
    trapaca = 1;

    for(let i = 0;i<(childs*childs);i++){
      let carta = document.getElementById("C"+i).parentNode.parentNode;
      if(!carta.classList.contains("carta_rodada")){
        carta.classList.add("carta_trap");
      }
    }
  }else{
    trapaca = 0;

    for(let i = 0;i<(childs*childs);i++){
      let carta = document.getElementById("C"+i).parentNode.parentNode;
      if(!carta.classList.contains("carta_rodada")){
        carta.classList.remove("carta_trap");
      }
    }
  }
}

function inicializaTimer(){
  let timer = document.getElementById("Timer");

  timer.parentNode.classList.remove("disable");
  switch(tamanho){
    case '2':
      timer.innerHTML=20;
      break;

    case '4':
      timer.innerHTML=60;
      break;

    case '6':
      timer.innerHTML=90;
      break;

    case '8':
      timer.innerHTML=120;
      break;
  }
}

function verificaVitoria(){
  acertos++;
  if(acertos==childs){
    clearInterval(ctempo);
    clearTimeout(cTimeout);
    if(confirm("Você Venceu ^-^,\n Deseja jogar novamente?")){
      document.location.reload();
    }else{
      window.open("../Ejogo/Ejogo.html","_self");
    }
  }
}

start();