var temp = null;

function start(){
	let query = window.location.search;
	let info = new URLSearchParams(query);
	let tamanho = info.get('tamanho');
	
	var cartas = makeCards(tamanho);
		
	shuffleArray(cartas);
	
	//console.log(cartas);	
	
	criaTabuleiro(tamanho, cartas);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function makeCards(tamanho){
	let numCarta = (tamanho/2)*tamanho;
	let cartas=[];
	
	
	for(let i = 0;i<numCarta;i++){
		cartas.push(i);
		cartas.push(i);
	}
	return cartas;
}

function criaTabuleiro(tamanho, cartas){
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

	if((carta.name != null) && (carta.name != "costa")){
		flipCarta(event.target.id)
		if(temp == null){
			temp = [carta.name,carta.id];
			console.log(temp)
		}else{
			if(temp[0] == carta.name){
				window.alert("Acertou")
				temp = null;
			}else{
				let par = document.getElementById(temp[1])
				
				console.log(temp)
				deFlipCarta(event.target.id);
				deFlipCarta(temp[1]);	
				
				temp = null;

				window.alert("Errou")
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

start();
















