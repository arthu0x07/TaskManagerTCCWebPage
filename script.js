var AuthKey = undefined;

/* Fazer um endpoint apenas e modificar nas requisições... */
const endpointTask = "http://192.168.1.15:3333/task";
const endpointUser = "http://192.168.1.15:3333/user";

/* Variáveis usadas nas log*/
var MenuIsOpen = false;
var MsgIsOpen = false;
var LoginIsOpen = false;
var RegisterIsOpen = false;
var MenuHeaderIsOpen = false;

/* Seção botão menu */
ButtonMenuHeader = document.querySelector(".header-icon-menu");
ButtonMenuHeader.addEventListener("click", OpenMenuHeader);

function OpenMenuHeader() {
  let conteinerNav = document.querySelector(".conteiner-nav-menu");

  if (MenuHeaderIsOpen == false) {
    conteinerNav.classList.add("MenuVisible");
    MenuHeaderIsOpen = true;
  } else if (MenuHeaderIsOpen == true) {
    conteinerNav.classList.remove("MenuVisible");
    MenuHeaderIsOpen = false;
  }
}

/* Seção Logout */
ButtonLogout = document.querySelector("#button-logout");
ButtonLogout.addEventListener("click", ReloadPage);

function ReloadPage() {
  location.reload();
}

/* Seção Login e autenticação */
ButtonLogin = document.querySelector("#button-login");
ButtonLogin.addEventListener("click", OpenFormsLogin);

ButtonCloseLogin = document.querySelector("#close-login");
ButtonCloseLogin.addEventListener("click", OpenFormsLogin);

ButtonSubmitLogin = document.querySelector("#button-login-submit");
ButtonSubmitLogin.addEventListener("click", SubmitLogin);

function OpenFormsLogin() {
  let ConteinerForms = document.querySelector(".forms-login");

  if (LoginIsOpen == true) {
    ConteinerForms.style.top = "-105%";
    LoginIsOpen = false;
  } else if (LoginIsOpen == false) {
    ConteinerForms.style.top = "1%";
    LoginIsOpen = true;
  }
}

async function SubmitLogin(e) {
  e.preventDefault();

  let ConteinerForms = document.querySelector(".conteiner-forms-login");
  var email = ConteinerForms.children[1].value;
  var password = ConteinerForms.children[3].value;
  ConteinerForms.children[1].value = "";
  ConteinerForms.children[3].value = "";

  const response = await fetch(
    `${endpointUser}/login`,
    (options = {
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });

  if (response[0]?.authkey == undefined) {
    feedback("error", "User Not Found", "please, trying again...");
  } else {
    feedback("check", "Login Successfull", "please, wait one second");
    AuthKey = response[0].authkey;

    LiberatedApp();
    OpenFormsLogin();
    SearchTasks();
    LiberatedOptionsLogin();
  }
}

/* 
  conteiner-card-expandido
  header-menu-button
  container-cards-general
*/

function LiberatedApp() {
  let MainConteiner = document.querySelector(".main-conteiner");
  MainConteiner.style.display = "none";

  let ConteinerApresentation = document.querySelector(
    ".conteiner-apresentation"
  );
  ConteinerApresentation.style.display = "none";

  let ConteinerApresentationTwo = document.querySelector(
    ".conteiner-apresentation-two"
  );
  ConteinerApresentationTwo.style.display = "none";

  let HeaderMenuButton = document.querySelector("#header-menu-button");
  HeaderMenuButton.style.display = "block";

  let ConteinerCardExpandido = document.querySelector(
    ".conteiner-card-expandido"
  );
  ConteinerCardExpandido.style.display = "flex";

  let ConteinerCardsGeneral = document.querySelectorAll(
    ".container-cards-general"
  );
  for (let i = 0; i < ConteinerCardsGeneral.length; i++) {
    ConteinerCardsGeneral[i].style.display = "block";
  }
}

function LiberatedOptionsLogin() {
  let ButtonLogout = document.querySelector("#button-logout");
  let ButtonLogin = document.querySelector("#button-login");
  let ButtonRegister = document.querySelector("#button-register");

  ButtonRegister.style.display = "none"; 
  ButtonLogin.style.display = "none";
  ButtonLogout.classList.add("button-logout-visible");
}

/* Seção Registro...  */
ButtonRegister = document.querySelector("#button-register");
ButtonRegister.addEventListener("click", OpenFormsRegister);

ButtonCloseRegister = document.querySelector("#close-register");
ButtonCloseRegister.addEventListener("click", OpenFormsRegister);

ButtonSubmitRegister = document.querySelector("#button-register-submit");
ButtonSubmitRegister.addEventListener("click", SubmitRegister);

function OpenFormsRegister() {
  let ConteinerForms = document.querySelector(".forms-register");

  if (RegisterIsOpen == true) {
    ConteinerForms.style.top = "-105%";
    RegisterIsOpen = false;
  } else if (RegisterIsOpen == false) {
    ConteinerForms.style.top = "1%";
    RegisterIsOpen = true;
  }
}

async function SubmitRegister(e) {
  e.preventDefault();

  let ConteinerForms = document.querySelector(".conteiner-forms-register");
  var name = ConteinerForms.children[1].value;
  var email = ConteinerForms.children[3].value;
  var password = ConteinerForms.children[5].value;

  const response = await fetch(
    `${endpointUser}/register`,
    (options = {
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(response);

  ConteinerForms.children[1].value = "";
  ConteinerForms.children[3].value = "";
  ConteinerForms.children[5].value = "";

  if (response?.authkey == undefined) {
    feedback("error", "User Not Created", "please, trying again...");
  } else {
    feedback("check", "Login Successfull", "please, wait one second");
    AuthKey = response.authkey;
    SearchTasks();
    OpenFormsRegister();
    feedback("check", "User created", "Welcome!");
  }
}

function feedback(iconname, title, description) {
  conteinerMsg = document.querySelector(".conteiner-erro-msg");
  conteinerIcon = document.querySelector(".conteiner-icon");

  conteinerIcon.innerHTML = "";

  iconmsgCheck = document.createElement("i");
  iconmsgCheck.setAttribute("class", "fas fa-check-circle");

  iconmsgErr = document.createElement("i");
  iconmsgErr.setAttribute("class", "fas fa-exclamation-circle");

  MsgTitle = document.querySelector(".title-mensage");
  MsgTitle.innerText = title;
  MsgDescription = document.querySelector(".description-mensage");
  MsgDescription.innerText = description;

  if (iconname == "check") {
    conteinerIcon.append(iconmsgCheck);
  } else if (iconname == "error") {
    conteinerIcon.append(iconmsgErr);
  }

  if (MsgIsOpen == false) {
    AparecerMsg();
  }
}

ButtonConfirmMsg = document.querySelector(".confirm-mensage");
ButtonConfirmMsg.addEventListener("click", FecharMsg);

// Sempre que uma tarefa for cadastrada, atualizada ou deletada chamar a função de limpar as tarefas do container e chamar novamente o searchTasks.
// Será utilizada junto com a função vista para atualizar as tasks
async function UpdateTasks(
  IdTask,
  NewValueTitle,
  NewValueDescription,
  NewValueData
) {
  // Criar requisição com estes valores para atualizar... Após a atualização retornar 200 e rebuscar as tasks

  console.log(IdTask);

  if (
    IdTask == undefined &&
    NewValueTitle != "" &&
    NewValueDescription != "" &&
    NewValueData != ""
  ) {
    feedback("error", "No Task", "your trying update without selecting a task");
    return undefined;
  } else if (
    IdTask != "" &&
    NewValueTitle != "" &&
    NewValueDescription != "" &&
    NewValueData != ""
  ) {
    feedback("check", "Task Updated", "your task has been updated");
  } else {
    feedback("error", "Empty Field", "don't leave empty fields");
    return undefined;
  }

  NewTask = {
    macadress: AuthKey,
    title: NewValueTitle,
    description: NewValueDescription,
    when: NewValueData,
  };

  response = await fetch(
    `${endpointTask}/${IdTask}`,
    (options = {
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      method: "PUT",
      body: JSON.stringify(NewTask),
    })
  ).then((response) => {
    return response.json();
  });
  console.log(response._id);

  SearchTasks();
}

// Deleta uma task pelo id, já está vinculada ao evento e está funcionando!
async function DeleteTasks(id) {
  // Chamada por um evento nos botões...
  // Vai mandar uma requisição para deletar, e em seguida vai apagar o conteiner com esse id. Deletamos com o element.remove();
  // fazer a comparação antes da requisição

  console.log(id);

  if (id == undefined || id == null) {
    feedback(
      "error",
      "No Task",
      "you are trying to delete without selecting a task"
    );

    return undefined;
  }

  response = await fetch(
    `${endpointTask}/${id}`,
    (options = { method: "DELETE", mode: "cors" })
  ).then((response) => {
    return response.json();
  });
  console.log(response);

  if (response == null) {
    feedback("error", "Empty Field", "don't leave empty fields");
    return undefined;
  } else {
    feedback("check", "Task Deleted", "Your task has been deleted");
    SearchTasks();
  }
}

// Cria task, consertado utilizando a função de data.
async function CreateTasks(title, description, datetask) {
  if (title != "" && description != "" && datetask != "") {
    feedback("check", "Created Task", "your task has been created");
  } else {
    feedback("error", "Empty Tasks", "don't create empty tasks");
    return undefined;
  }

  // Vai receber valores do forms...
  const task = {
    macadress: AuthKey,
    type: "8",
    title: title,
    description: description,
    when: TaskFormatDateForCreate(datetask),
  };

  response = await fetch(
    `${endpointTask}`,
    (options = {
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(task),
    })
  ).then((response) => response.json());

  SearchTasks();
}

//Solicita para o servidor as tasks e renderiza usando a função vista.
async function SearchTasks() {
  CleanCardConteiner();

  let dataall = "";
  dataall = await fetch(
    `${endpointTask}/filter/all/${AuthKey}`,
    (options = { method: "GET", mode: "cors" })
  ).then((response) => response.json());
  dataall.map((item) => {
    CreateCard(
      item._id,
      item.title,
      item.description,
      TaskFormatDateForCard(item.when),
      "all"
    );
  });

  datalate = await fetch(
    `${endpointTask}/filter/late/${AuthKey}`,
    (options = { method: "GET", mode: "cors" })
  ).then((response) => response.json());
  datalate.map((item) => {
    CreateCard(
      item._id,
      item.title,
      item.description,
      TaskFormatDateForCard(item.when),
      "late"
    );
  });

  datatoday = await fetch(
    `${endpointTask}/filter/today/${AuthKey}`,
    (options = { method: "GET", mode: "cors" })
  ).then((response) => response.json());
  datatoday.map((item) => {
    CreateCard(
      item._id,
      item.title,
      item.description,
      TaskFormatDateForCard(item.when),
      "today"
    );
  });

  dataweek = await fetch(
    `${endpointTask}/filter/week/${AuthKey}`,
    (options = { method: "GET", mode: "cors" })
  ).then((response) => response.json());
  dataweek.map((item) => {
    CreateCard(
      item._id,
      item.title,
      item.description,
      TaskFormatDateForCard(item.when),
      "week"
    );
  });

  datamonth = await fetch(
    `${endpointTask}/filter/month/${AuthKey}`,
    (options = { method: "GET", mode: "cors" })
  ).then((response) => response.json());
  datamonth.map((item) => {
    CreateCard(
      item._id,
      item.title,
      item.description,
      TaskFormatDateForCard(item.when),
      "month"
    );
  });

  CleanFormEditmode();
  CleanFormViewMode();
}

// Função que cria os cards na tela, chamada após ter sido enviada para o servidor.
function CreateCard(_id, title, description, datetask, status) {
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
                <h2>${datetask}</h2>
            <div class="div-botoes">
                <button class="button-icon" id="button-visualizaTask"> <i class="far fa-eye"></i> </button>
                <button class="button-icon" id="button-DeletaTask"> <i class="far fa-trash-alt"></i> </button>
            </div>

        <div class="section-desc">
            <p>${title}</p>
        </div>
    `;

  //Renderiza no conteiner definido.
  if (status == "late") {
    let containerCards = document.querySelector(
      ".container-cards-general-late .container-cards"
    );
    containerCards.append(TaskElement);
  } else if (status == "all") {
    let containerCards = document.querySelector(
      ".container-cards-general-all .container-cards"
    );
    containerCards.append(TaskElement);
  } else if (status == "today") {
    let containerCards = document.querySelector(
      ".container-cards-general-today .container-cards"
    );
    containerCards.append(TaskElement);
  } else if (status == "week") {
    let containerCards = document.querySelector(
      ".container-cards-general-week .container-cards"
    );
    containerCards.append(TaskElement);
  } else if (status == "month") {
    let containerCards = document.querySelector(
      ".container-cards-general-month .container-cards"
    );
    containerCards.append(TaskElement);
  }

  let botaovisualizar = TaskElement.children[1].children[0];
  let botaodeletar = TaskElement.children[1].children[1];

  botaovisualizar.addEventListener("click", ReceiveDataCard);
  botaodeletar.addEventListener("click", () => {
    DeleteTasks(TaskElement.dataset.id);
  });

  // Eventos utilizados para enviar dados do card para o conteiner expandido // Errps aqui
  let DivData = document.querySelectorAll(`[data-id="${_id}"] h2`);
  let DivDesc = document.querySelectorAll(`[data-id="${_id}"] .section-desc`);

  for (let x = 0; x != DivData.length; x++) {
    DivData[x].addEventListener("click", ReceiveDataCard);
  }

  for (let z = 0; z != DivData.length; z++) {
    DivDesc[z].addEventListener("click", ReceiveDataCard);
  }
}

//Recebe informações de um evento de clique e passa para o conteiner expandido... Botoes de visualização consertados
function ReceiveDataCard(e) {
  if (this.parentNode.className == "cards") {
    console.log("duvcard");
    datetask = this.parentNode.dataset.datetask;
    title = this.parentNode.dataset.title;
    id = this.parentNode.dataset.id;
    description = this.parentNode.dataset.description;
  } else if (this.parentNode.className == "div-botoes") {
    console.log("duvcardsadasdasd");

    datetask = this.parentNode.parentNode.dataset.datetask;
    title = this.parentNode.parentNode.dataset.title;
    id = this.parentNode.parentNode.dataset.id;
    description = this.parentNode.parentNode.dataset.description;
  }

  ReplaceDataCardExpand(id, title, datetask, description);
}

// Recebe as informações para adicionar no card expandido Vai ser usada para setar nos h2 e etc, quando clicar no botao oculta esses campos e aparece os inputs usados
function ReplaceDataCardExpand(id, title, datetask, description) {
  let ExpandCardTitle = document.querySelector("#titulo-header-card");
  let ExpandCardDesc = document.querySelector(".descricao-tarefa-expandida");
  let ConteinerCardExp = document.querySelector(".conteiner-card-expandido");

  ConteinerCardExp.setAttribute("data-idExpand", id);
  ConteinerCardExp.setAttribute("data-title", title);
  ConteinerCardExp.setAttribute("data-datetask", datetask);
  ConteinerCardExp.setAttribute("data-description", description);

  ExpandCardTitle.innerText = `${title} (${datetask})`;
  ExpandCardDesc.value = description;
}

// Eventos do Header de visualização
let BotaoCardExpandDeletar = document.querySelector("#button-Deleta");
let BotaoCardExpandEntrarEditMode = document.querySelector(
  "#button-EntrarEditMode"
);
BotaoCardExpandDeletar.addEventListener("click", ExpandCardDeleteTask);
BotaoCardExpandEntrarEditMode.addEventListener("click", EntrarEditMode);

// Eventos do Header de Edição
let BotaoCardExpandSalvar = document.querySelector("#button-SalvaTask");
let BotaoCardExpandSairEditMode = document.querySelector(
  "#button-SairModoEdit"
);
BotaoCardExpandSalvar.addEventListener("click", SaveTask);
BotaoCardExpandSairEditMode.addEventListener("click", SairEditMode);

// Limpa os forms do Edimode após salvar uma tarefa ou sair do modo de visualização...
function CleanFormEditmode() {
  InputEditTitle = document.querySelector("#InputTitleEdit");
  InputEditDate = document.querySelector("#InputDateEdit");
  InputEditDescription = document.querySelector(".descricao-tarefa-expandida");

  InputEditDate.value = "";
  InputEditTitle.value = "";
  InputEditDescription.value = "";

  ConteinerDataSet = document.querySelector(".conteiner-card-expandido");
  ConteinerDataSet.removeAttribute("data-idexpand");
  ConteinerDataSet.removeAttribute("data-title");
  ConteinerDataSet.removeAttribute("data-description");
  ConteinerDataSet.removeAttribute("data-datetask");
}

// Limpa os campos do viewmode...
function CleanFormViewMode() {
  TituloHeaderCard = document.querySelector("#titulo-header-card");
  TituloHeaderCard.innerText = "Seu titulo";

  DescricaoTarefaExpandida = document.querySelector(
    ".descricao-tarefa-expandida"
  );
  DescricaoTarefaExpandida.value = "";
}

function SaveTask(e) {
  let IdTask = document.querySelector(".conteiner-card-expandido").dataset
    .idexpand;
  let NewValueTitle = document.querySelector("#InputTitleEdit").value;
  let NewValueData = document.querySelector("#InputDateEdit").value;
  let NewValueDescription = document.querySelector(
    ".descricao-tarefa-expandida"
  ).value;

  UpdateTasks(
    IdTask,
    NewValueTitle,
    NewValueDescription,
    TaskFormatDateForCreate(NewValueData)
  );
}

// Ao Ser chamada, oculta o header principal do card e expoe o de edição
function EntrarEditMode() {
  let headerCard = document.querySelector(".header-card-expandido");
  let headerCardEditMode = document.querySelector(
    ".header-card-expandido-editmode"
  );
  let textArea = document.querySelector(".descricao-tarefa-expandida");

  headerCard.style.display = "none";
  headerCardEditMode.style.display = "flex";
  textArea.removeAttribute("disabled");
}

function SairEditMode() {
  CleanFormEditmode();
  CleanFormViewMode();

  let headerCard = document.querySelector(".header-card-expandido");
  let headerCardEditMode = document.querySelector(
    ".header-card-expandido-editmode"
  );
  let textArea = document.querySelector(".descricao-tarefa-expandida");

  headerCardEditMode.style.display = "none";
  headerCard.style.display = "flex";
  textArea.disabled = "false";
}

function ExpandCardDeleteTask(e) {
  // se a função de deletar retornar 200, resetar os campos, deletar os data-sets
  IDTask = e.path[5].dataset.idexpand;
  retorno = DeleteTasks(IDTask);

  if (retorno) {
    document.querySelector("#titulo-header-card").innerText = "";
    document.querySelector(".descricao-tarefa-expandida").value = "";

    ConteinerCardExp = document.querySelector(".conteiner-card-expandido");

    ConteinerCardExp.removeAttribute("data-idExpand");
    ConteinerCardExp.removeAttribute("data-title");
    ConteinerCardExp.removeAttribute("data-datetask");
    ConteinerCardExp.removeAttribute("data-description");
  }
}

// Está funcionando, pega no padrão americano e converte para PT-BR, usado para os cards
function TaskFormatDateForCard(date) {
  data = new Date(date);
  return data.toLocaleDateString("pt-br");
}

// Funcionando - Data sendo convertida para o padrão utilizado no backend
function TaskFormatDateForCreate(DateBrasilFormat) {
  ano = `${DateBrasilFormat[0]}${DateBrasilFormat[1]}${DateBrasilFormat[2]}${DateBrasilFormat[3]}`;
  mes = `${DateBrasilFormat[5]}${DateBrasilFormat[6]}`;
  dia = `${DateBrasilFormat[8]}${DateBrasilFormat[9]}`;

  DataBackEndFormat = `${mes}/${dia}/${ano}`;

  return DataBackEndFormat;
}

// Vai ser usada para atualizar os itens
function AtualizaCard(_id, novosvaloresetc) {
  //Atualiza os data-sets e os valores interno do card - Após a atualização deve enviar para o servidor.
}

// Limpa o conteiner de cards, vai ser usado para resetar e renderizar novamente com os filtros
function CleanCardConteiner() {
  let containerCards = document.querySelectorAll(".container-cards");

  containerCards[0].innerHTML = "";
  containerCards[1].innerHTML = "";
  containerCards[2].innerHTML = "";
  containerCards[3].innerHTML = "";
  containerCards[4].innerHTML = "";
}

// Adiciona eventos no forms, retem os valores, e envia para a função de criar tarefas no banco.
Forms = document.querySelector(".conteiner-forms");
Forms.addEventListener("submit", FormReceiveValue);
function FormReceiveValue(e) {
  e.preventDefault();

  ValueTitle = Forms[0].value;
  ValueDescription = Forms[1].value;
  ValueDate = Forms[2].value;

  CreateTasks(ValueTitle, ValueDescription, ValueDate);

  CleanFormValues();
}

// Usada para resetar os valores dos campos após o cadastro...
function CleanFormValues(e) {
  Forms[0].value = "";
  Forms[1].value = "";
  Forms[2].value = "";
}

ContainerMenu = document.querySelector(".menu-create");
ButtonMenu = document.querySelector("#header-menu-button");
ButtonMenu.addEventListener("click", StartMenu);

ButtonCloseMenuCreate = document.querySelector("#button-close-menucreate");
ButtonCloseMenuCreate.addEventListener("click", StartMenu);

function StartMenu() {
  console.log("click");

  if (MenuIsOpen == true) {
    CloseMenu();
    MenuIsOpen = false;
  } else {
    OpenMenu();
    MenuIsOpen = true;
  }
}

function CloseMenu() {
  ContainerMenu.style.animationName = "FecharMenu";
}

function OpenMenu() {
  ContainerMenu.style.animationName = "AbrirMenu";
}

function AparecerMsg() {
  conteinerMsg.style.animationName = "AparecerMsgErro";
  MsgIsOpen = true;
}

function FecharMsg() {
  conteinerMsg.style.animationName = "SumirMsgErro";
  MsgIsOpen = false;
}
