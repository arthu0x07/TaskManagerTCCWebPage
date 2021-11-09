const AuthKey = '15:15:15:15:15';
const endpoint = 'http://192.168.1.3:3333/task'
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

SearchTasks()