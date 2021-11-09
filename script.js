const AuthKey = '15:15:15:15:15';
const endpoint = 'http://localhost:3333/task/'
var MenuIsOpen = true;

// Sempre que uma tarefa for cadastrada, atualizada ou deletada chamar a função de limpar as tarefas do container e chamar novamente o searchTasks.

// Será utilizada junto com a função vista para atualizar as tasks
async function UpdateTasks(){
}

// Deleta uma task pelo id, já está vinculada ao evento e está funcionando!
async function DeleteTasks(id){
  // Chamada por um evento nos botões...
  // Vai mandar uma requisição para deletar, e em seguida vai apagar o conteiner com esse id. Deletamos com o element.remove();
  await fetch(`${endpoint}/${id}`, options = {method: 'DELETE', mode: 'cors'}).then(res => {isDeleted = res.status == 200 ? true : false });

  if(isDeleted == true){
    cardTask = document.querySelector(`[data-id="${id}"]`)
    cardTask.remove();
  } else{
    console.log('Não pode ser deletada...');
  }
  
}

// Cria task, está funcionando, mas precisamos de uma função para converter quando pegarmos o valor data do forms
async function CreateTasks(title, description, datetask){
  // Vai receber valores do forms...

  const task = {
    macadress: AuthKey,
    type: "8",
    title: title,
    description: description,
    when: datetask
  }

  response = await fetch(`${endpoint}`, options = {headers: { 'Content-Type': 'application/json' }, mode: 'cors', method: 'POST', body: JSON.stringify(task)}).then(response => response.json());

  SearchTasks()
}

//Solicita para o servidor as tasks e renderiza usando a função vista.
async function SearchTasks(){
  await CleanCardConteiner()

  var data = '';
  data = await fetch(`${endpoint}/filter/all/${AuthKey}`, options = {method: 'GET', mode: 'cors'}).then(response => response.json())
  
  data.map(item => 
    {
      CreateCard(item._id, item.title, item.description, TaskFormatDateForCard(item.when))
    })
}

// Função que cria os cards na tela, chamada após ter sido enviada para o servidor. 
function CreateCard(_id, title, description, datetask){
  console.log('entrou')
    // Div Principal - Recebe os dataSets
  var TaskElement = document.createElement("div");
  
    //Adiciona os valores
  TaskElement.setAttribute("data-id", _id);
  TaskElement.setAttribute("data-title", title);
  TaskElement.setAttribute("data-description", description);
  TaskElement.setAttribute("data-dateTask", datetask);

    //Estrutura do Card
  TaskElement.classList.add("cards");
  TaskElement.innerHTML = `
        <div>
            <div class="testing-padding">
                <h2>${datetask}</h2>
            </div>

            <div class="div-botoes">
                <button class="button-icon" id="button-visualizaTask"> <i class="far fa-eye"></i> </button>
                <button class="button-icon" id="button-DeletaTask"> <i class="far fa-trash-alt"></i> </button>
            </div>
        </div>

        <div>
            <p>${title}</p>
        </div>
    `;

    //Renderiza no conteiner definido.
  let containerCards = document.querySelector(".container-cards");
  containerCards.append(TaskElement);

  let botaovisualizar = TaskElement.children[0].children[1].children[0];
  let botaodeletar = TaskElement.children[0].children[1].children[1];

  botaovisualizar.addEventListener("click", () => {console.log("abre cont" + TaskElement.dataset.id)});
  botaodeletar.addEventListener("click", () => {DeleteTasks(TaskElement.dataset.id)});
}

// Está funcionando, pega no padrão americano e converte para PT-BR, usado para os cards
function TaskFormatDateForCard(date){
  data =  new Date(date);
  return data.toLocaleDateString('pt-br');
}

// Não Está funcionando, preciso conseguir converter data brasileira para americada dd/MM para MM/dd
function TaskFormatDateForCreate(datebrasil){
  data = new Date(datebrasil);
  console.log(data.getDay())
}

// Vai ser usada para atualizar os itens
function AtualizaCard(_id, novosvaloresetc){
  //Atualiza os data-sets e os valores interno do card - Após a atualização deve enviar para o servidor.
}

// Limpa o conteiner de cards, vai ser usado para resetar e renderizar novamente com os filtros
function CleanCardConteiner(){
  let containerCards = document.querySelector(".container-cards");
  containerCards.innerHTML = "";
}

// Adiciona eventos no forms, retem os valores, e envia para a função de criar tarefas no banco.
Forms = document.querySelector(".conteiner-forms");
Forms.addEventListener('submit', FormReceiveValue );
function FormReceiveValue(e){
  e.preventDefault();

  ValueTitle = Forms[0].value;
  ValueDescription = Forms[1].value;
  ValueDate = Forms[2].value;

  CreateTasks(ValueTitle, ValueDescription, ValueDate);
}

ContainerMenu = document.querySelector(".menu-create");
console.log(ContainerMenu);

ButtonMenu = document.querySelectorAll(".botaomenu");
ButtonMenu[0].addEventListener('click', StartMenu)
ButtonMenu[1].addEventListener('click', StartMenu)

function StartMenu(){
  console.log("click")

  if(MenuIsOpen == true){
    CloseMenu();
    MenuIsOpen = false;
  }
  
  else{
    OpenMenu()
    MenuIsOpen = true;
  }
}


function CloseMenu(){
  ContainerMenu.style.animationName = "FecharMenu";
}

function OpenMenu(){
  ContainerMenu.style.animationName = "AbrirMenu";

}












// Busca as tasks sempre que a página é carregada
SearchTasks();













// var idcards = 0;

// /* Função chamada quando vamos adicionar nova categoria */
// function AddCategoria(dias, descrição) {
//   /* condicional que checa se a tarefa está vazia e caso esteja apresenta um erro. */


//   if ((descrição == "") == true) {
//     let erromsgdescnull = document.getElementById("container-form-erroDescNull");
//     erromsgdescnull.style.display = "flex";

//     setTimeout(function () { erromsgdescnull.style.display = "none"}, 5000);

//     return null;

//   } else 
  

//   if (dias == "") {
//     let erromsgdaysnull = document.getElementById("container-form-erroDaysNull");
//     erromsgdaysnull.style.display = "flex";

//     setTimeout(function () {erromsgdaysnull.style.display = "none"}, 5000);

//   } else 
  

//   if (dias != "") {
//     dias = `${dias} dias`;
//   }


//   /* Base do cards ------------------- criar isso aqui foi um erro...*/ 
//   var newcard = document.createElement("div");
//   newcard.classList.add("cards");
//   newcard.innerHTML = `
//         <div>
//             <div class="testing-padding">
//                 <h2>${dias}</h2>
//             </div>

//             <div class="div-botoes">
//                 <button class="button-icon" id="button-visualizaTask"> <i class="far fa-eye"></i> </button>

//                 <button class="button-icon" id="button-DeletaTask"> <i class="far fa-trash-alt"></i> </button>
//             </div>
//         </div>

//         <div>
//             <p>${descrição}</p>
//         </div>
//     `;


//   /* Teve que dar esse role todo mesmo, não pensei em nada melhor. Se alterar alguma coisa dentro da estrutura da div mais pra frente, de um log nesse newcard que consiste na div do card e veja o path para chegar no botão de novo e adicionar os eventos e os datasets */


//   /* Adiciona o evento de clique nos dois botões */
//   let botaovisualizar = newcard.children[0].children[1].children[0];
//   let botaodeletar = newcard.children[0].children[1].children[1]


//   botaovisualizar.addEventListener("click", modificaTarefa);
//   botaodeletar.addEventListener("click", modificaTarefa);


//   /* Adiciona um atributo data para identificarmos os cards com os botões para modificar depois */
//   /* Atribuindo os data-attributes nos botoes */

//   botaovisualizar.setAttribute("data-idcard", idcards);
//   botaodeletar.setAttribute("data-idcard", idcards);


//   /* Atribuindo no conteiner do Card */
//   newcard.setAttribute("data-idcard", idcards);


//   /* Atribue no ID card para não se repetir*/
//   idcards++;


//   // /* Muda a cor de fundo do Card */
//   // newcard.style.backgroundColor = coresaleatorias();


//   /* Adiciona o card criado dentro do container */
//   let containerCards = document.querySelector(".container-cards");
//   containerCards.append(newcard);


//   /* Evento adicionado para quando clicarmos no card dias e titulos areas */
//   newcard.addEventListener("click", ApresentaCard);

// }

// function ApresentaCard(event){
//   /* Colocar eventos em um botão do card para sumir com o card*/
//   let conteinerCardOcultodaViladaFolha = document.querySelector(".conteiner-card-expandido");
  

//    if(conteinerCardOcultodaViladaFolha.style.display == "none"){
//      conteinerCardOcultodaViladaFolha.style.display = "flex";
//    }


//   /* separa o idcard em todos os cantos do conteiner, pois cada elemento que clicamos o objeto de eventos vem com um pathing diferente. Usa a quantidade de pathing para reparar, pois cada um tem um diferente */

//   let idcard = '';
  
//    if(event.path.length == 9){
//     idcard = event.path[1].dataset.idcard;

//    } else
   
//    if(event.path.length == 10){
//      idcard = event.path[2].dataset.idcard;

//    } else

//    if(event.path.length == 11){
//      idcard = event.path[3].dataset.idcard;
  
//    } else

//    if(event.path.length == 12){
//      idcard = event.path[4].dataset.idcard;
  
//    }


//   /* busca o elemento pelo data-set */
//   let idcardDiv = document.querySelector(`[data-idcard="${idcard}"]`);
  

//   /* Separa os valores em variáveis */
//   let tempo = idcardDiv.childNodes[1].children[0].innerText;
//   let titulo = idcardDiv.childNodes[3].children[0].innerText;
  

//   /* Coloca no Card oculto */
//   conteinerCardOcultodaViladaFolha.children[0].children[0].innerHTML = `<h2 id="titulo-header-card">${titulo} em ${tempo}</h2>`;

// }




// /* função atribuida ao evento de clique nos botões dos cards */
// function modificaTarefa(event) {
//   /* valor do dataset para fazer a condicional */
//   let valorid = event.path[1].getAttribute("id");


//   /* valor do dataset do botão do evento atual */
//   idcardBotao = event.path[1].dataset.idcard;


//   /* valor do dataset da div */ /* usamos o dataset do botão para localizar o card, por isso que adicionamos o data set no momento da criação da tarefa */
//   idcardDiv = document.querySelector(`[data-idcard="${idcardBotao}"]`);


//   /* Vê qual botão é e toma uma ação */
//   if (valorid == "button-visualizaTask") {
//     ApresentaCard(event);

//   } else 
  
//   if (valorid == "button-DeletaTask") {
//     idcardDiv.remove();
//   }

// }



// /* Atribuindo o evento no forms de adicionar tarefas. */
// let formscadastro = document.querySelector("#formscadastro");
// formscadastro.addEventListener("submit", cadastrarTarefa);



// /* Função que pega os valores dos forms e cria um card */
// function cadastrarTarefa(event) {
//   event.preventDefault();


//   /* Joga na função vista acima de criar os Cards os valores dos inputs */
//   /* event.target[].value representa os valores dos inputs no momento do evento. Ele referencia a ordem que os inputs aparecem no conteiner do evento, no caso o forms. Atualmente, o de dias é o primeiro, e o segundo é o de descrição. */
//   AddCategoria(event.target[0].value, event.target[1].value);


//   /* Reseta os valores dos inputs p/ o user não ter que apagar */
//   event.target[0].value = "";
//   event.target[1].value = "";

// }



// /* Função de cores aleatorias para os cards*/
// function coresaleatorias() {
//   var r = Math.random() * 255;
//   var g = Math.random() * 255;
//   var b = Math.random() * 255;
  

//   return `rgb(${r}, ${g}, ${b})`;

// }
