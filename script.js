var idcards = 0;
AddCategoria("12", "Pegar o carregador");
AddCategoria("12", "Pegar o carregador");
AddCategoria("12", "Pegar o carregador");
AddCategoria("12", "Pegar o carregador");


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
            <div>
                <h2>${dias}</h2>
            </div>

            <div class="div-botoes">
                <button class="button-icon" id="button-alteraTask"> <i class="far fa-edit"></i> </button>

                <button class="button-icon" id="button-DeletaTask"> <i class="far fa-times-circle"></i> </button>
            </div>
        </div>
        <div>
            <p>${descrição}</p>
        </div>
    `;

  /* Teve que dar esse role todo mesmo, não pensei em nada melhor. Se alterar alguma coisa dentro da estrutura da div mais pra frente, de um log nesse newcard que consiste na div do card e veja o path para chegar no botão de novo e adicionar os eventos e os datasets */

  /* Adiciona o evento de clique nos dois botões */
  newcard.children[0].children[1].children[0].addEventListener("click", modificaTarefa);
  newcard.children[0].children[1].children[1].addEventListener("click", modificaTarefa);

  /* Adiciona um atributo data para identificarmos os cards com os botões para modificar depois */

  /* Atribuindo os data-attributes nos botoes */
  newcard.children[0].children[1].children[0].setAttribute("data-idcard", idcards);
  newcard.children[0].children[1].children[1].setAttribute("data-idcard", idcards);



  /* Atribuindo no conteiner do Card */
  newcard.setAttribute("data-idcard", idcards);

  /* Atribue no ID card para não se repetir*/
  idcards++;
  /* Muda a cor de fundo do Card */
  newcard.style.backgroundColor = coresaleatorias();

  /* Adiciona o card criado dentro do container */
  let containerCards = document.querySelector(".container-cards");
  containerCards.append(newcard);
}




/* função atribuida ao evento de clique nos botões dos cards */
function modificaTarefa(event) {
  /* valor do dataset para fazer a condicional */
  let valorid = event.path[1].getAttribute("id");
  /* valor do dataset do botão do evento atual */
  idcardBotao = event.path[1].dataset.idcard;
  /* valor do dataset da div */ /* usamos o dataset do botão para localizar o card, por isso que adicionamos o data set no momento da criação da tarefa */
  idcardDiv = document.querySelector(`[data-idcard="${idcardBotao}"]`);

  if (valorid == "button-alteraTask") {
    console.log("Alterou");

  } else 
  
  
  if (valorid == "button-DeletaTask") {
    idcardDiv.remove();
  }
}

/* Atribuindo o evento no forms de adicionar tarefas. */
let formscadastro = document.querySelector("#formscadastro");
formscadastro.addEventListener("submit", cadastrarTarefa);

function cadastrarTarefa(event) {
  event.preventDefault();

  /* Joga na função vista acima de criar os Cards os valores dos inputs */
  /* event.target[].value representa os valores dos inputs no momento do evento. Ele referencia a ordem que os inputs aparecem no conteiner do evento, no caso o forms. Atualmente, o de dias é o primeiro, e o segundo é o de descrição. */
  AddCategoria(event.target[0].value, event.target[1].value);

  /* Reseta os valores dos inputs p/ o user não ter que apagar */
  event.target[0].value = "";
  event.target[1].value = "";
}

function coresaleatorias() {
  var r = Math.random() * 255;
  var g = Math.random() * 255;
  var b = Math.random() * 255;

  return `rgb(${r}, ${g}, ${b})`;
}
