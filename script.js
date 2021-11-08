var idcards = 0;
AddCategoria("12", "Pegar o carregador");
AddCategoria("3", "Treinão");
AddCategoria("12", "Trabalho ingles");




/* Função chamada quando vamos adicionar nova categoria */
function AddCategoria(dias, descrição) {
  /* condicional que checa se a tarefa está vazia e caso esteja apresenta um erro. */


  if ((descrição == "") == true) {
    let erromsgdescnull = document.getElementById("container-form-erroDescNull");
    erromsgdescnull.style.display = "flex";

    setTimeout(function () { erromsgdescnull.style.display = "none"}, 5000);

    return null;

  } else 
  

  if (dias == "") {
    let erromsgdaysnull = document.getElementById("container-form-erroDaysNull");
    erromsgdaysnull.style.display = "flex";

    setTimeout(function () {erromsgdaysnull.style.display = "none"}, 5000);

  } else 
  

  if (dias != "") {
    dias = `${dias} dias`;
  }


  /* Base do cards */
  var newcard = document.createElement("div");
  newcard.classList.add("cards");
  newcard.innerHTML = `
        <div>
            <div class="testing-padding">
                <h2>${dias}</h2>
            </div>

            <div class="div-botoes">
                <button class="button-icon" id="button-visualizaTask"> <i class="far fa-eye"></i> </button>

                <button class="button-icon" id="button-DeletaTask"> <i class="far fa-trash-alt"></i> </button>
            </div>
        </div>

        <div>
            <p>${descrição}</p>
        </div>
    `;


  /* Teve que dar esse role todo mesmo, não pensei em nada melhor. Se alterar alguma coisa dentro da estrutura da div mais pra frente, de um log nesse newcard que consiste na div do card e veja o path para chegar no botão de novo e adicionar os eventos e os datasets */


  /* Adiciona o evento de clique nos dois botões */
  let botaovisualizar = newcard.children[0].children[1].children[0];
  let botaodeletar = newcard.children[0].children[1].children[1]


  botaovisualizar.addEventListener("click", modificaTarefa);
  botaodeletar.addEventListener("click", modificaTarefa);


  /* Adiciona um atributo data para identificarmos os cards com os botões para modificar depois */
  /* Atribuindo os data-attributes nos botoes */

  botaovisualizar.setAttribute("data-idcard", idcards);
  botaodeletar.setAttribute("data-idcard", idcards);


  /* Atribuindo no conteiner do Card */
  newcard.setAttribute("data-idcard", idcards);


  /* Atribue no ID card para não se repetir*/
  idcards++;


  // /* Muda a cor de fundo do Card */
  // newcard.style.backgroundColor = coresaleatorias();


  /* Adiciona o card criado dentro do container */
  let containerCards = document.querySelector(".container-cards");
  containerCards.append(newcard);


  /* Evento adicionado para quando clicarmos no card dias e titulos areas */
  newcard.addEventListener("click", ApresentaCard);

}

function ApresentaCard(event){
  /* Colocar eventos em um botão do card para sumir com o card*/
  let conteinerCardOcultodaViladaFolha = document.querySelector(".conteiner-card-expandido");
  

   if(conteinerCardOcultodaViladaFolha.style.display == "none"){
     conteinerCardOcultodaViladaFolha.style.display = "flex";
   }


  /* separa o idcard em todos os cantos do conteiner, pois cada elemento que clicamos o objeto de eventos vem com um pathing diferente. Usa a quantidade de pathing para reparar, pois cada um tem um diferente */

  let idcard = '';
  
   if(event.path.length == 9){
    idcard = event.path[1].dataset.idcard;

   } else
   
   if(event.path.length == 10){
     idcard = event.path[2].dataset.idcard;

   } else

   if(event.path.length == 11){
     idcard = event.path[3].dataset.idcard;
  
   } else

   if(event.path.length == 12){
     idcard = event.path[4].dataset.idcard;
  
   }


  /* busca o elemento pelo data-set */
  let idcardDiv = document.querySelector(`[data-idcard="${idcard}"]`);
  

  /* Separa os valores em variáveis */
  let tempo = idcardDiv.childNodes[1].children[0].innerText;
  let titulo = idcardDiv.childNodes[3].children[0].innerText;
  

  /* Coloca no Card oculto */
  conteinerCardOcultodaViladaFolha.children[0].children[0].innerHTML = `<h2 id="titulo-header-card">${titulo} em ${tempo}</h2>`;

}




/* função atribuida ao evento de clique nos botões dos cards */
function modificaTarefa(event) {
  /* valor do dataset para fazer a condicional */
  let valorid = event.path[1].getAttribute("id");


  /* valor do dataset do botão do evento atual */
  idcardBotao = event.path[1].dataset.idcard;


  /* valor do dataset da div */ /* usamos o dataset do botão para localizar o card, por isso que adicionamos o data set no momento da criação da tarefa */
  idcardDiv = document.querySelector(`[data-idcard="${idcardBotao}"]`);


  /* Vê qual botão é e toma uma ação */
  if (valorid == "button-visualizaTask") {
    ApresentaCard(event);

  } else 
  
  if (valorid == "button-DeletaTask") {
    idcardDiv.remove();
  }

}



/* Atribuindo o evento no forms de adicionar tarefas. */
let formscadastro = document.querySelector("#formscadastro");
formscadastro.addEventListener("submit", cadastrarTarefa);



/* Função que pega os valores dos forms e cria um card */
function cadastrarTarefa(event) {
  event.preventDefault();


  /* Joga na função vista acima de criar os Cards os valores dos inputs */
  /* event.target[].value representa os valores dos inputs no momento do evento. Ele referencia a ordem que os inputs aparecem no conteiner do evento, no caso o forms. Atualmente, o de dias é o primeiro, e o segundo é o de descrição. */
  AddCategoria(event.target[0].value, event.target[1].value);


  /* Reseta os valores dos inputs p/ o user não ter que apagar */
  event.target[0].value = "";
  event.target[1].value = "";

}



/* Função de cores aleatorias para os cards*/
function coresaleatorias() {
  var r = Math.random() * 255;
  var g = Math.random() * 255;
  var b = Math.random() * 255;
  

  return `rgb(${r}, ${g}, ${b})`;

}
