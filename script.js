// Criando um elemento div para conter todo o conteúdo
let containerDiv = document.createElement("div");
containerDiv.id = "container";

// Criando um elemento h2 com a imagem e o texto
let h2Element = document.createElement("h2");
let imgElement = document.createElement("img");
imgElement.src = "./images/pino-de-localizacao-2.png";
imgElement.alt = "imagem de uma casa com um ponto de localização";
h2Element.appendChild(imgElement);
h2Element.appendChild(document.createTextNode("Buscador de Endereço ViaCep"));

// Criando um hr
let hrElement = document.createElement("hr");

// Criando um elemento form
let formElement = document.createElement("form");
formElement.id = "informacoes";
formElement.action = "";

// Adicionando os elementos input dentro do form
let inputs = [
  {
    id: "cep",
    type: "text",
    placeholder: "Digite apenas números",
    label: "CEP:",
  },
  {
    id: "logradouro",
    type: "text",
    placeholder: "Rua, Travessa, Avenida",
    label: "Logradouro:",
  },
  { id: "numero", type: "text", label: "Número:" },
  {
    id: "complemento",
    type: "text",
    placeholder: "Ap, Andar, Bloco, Ponto de Referência...",
    label: "Complemento:",
  },
  { id: "bairro", type: "text", label: "Bairro:" },
  { id: "cidade", type: "text", label: "Cidade:" },
  { id: "uf", type: "text", label: "UF:" },
];

inputs.forEach(function (input) {
  let pElement = document.createElement("p");
  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", input.id);
  labelElement.textContent = input.label;
  let inputElement = document.createElement("input");
  inputElement.id = input.id;
  inputElement.type = input.type;
  if (input.placeholder) {
    inputElement.placeholder = input.placeholder;
  }
  pElement.appendChild(labelElement);
  pElement.appendChild(inputElement);
  formElement.appendChild(pElement);
});

// Adicionando todos os elementos dentro do containerDiv
containerDiv.appendChild(h2Element);
containerDiv.appendChild(hrElement);
containerDiv.appendChild(formElement);

// Adicionando o containerDiv ao final do corpo do documento
document.body.appendChild(containerDiv);

const inputCep = document.getElementById("cep");
const inputLogradouro = document.getElementById("logradouro");
const inputComplemento = document.getElementById("complemento");
const inputNumero = document.getElementById("numero");
const inputBairro = document.getElementById("bairro");
const inputCidade = document.getElementById("cidade");
const inputUF = document.getElementById("uf");

// Função para buscar e dar foco ao primeiro elemento em branco
function focusOnFirstEmpty() {
  const inputs = [
    inputLogradouro,
    inputComplemento,
    inputNumero,
    inputBairro,
    inputCidade,
    inputUF,
  ];

  for (const input of inputs) {
    if (input.value.trim() === "") {
      input.focus();
      break; // Parar a busca assim que encontrar o primeiro elemento em branco
    }
  }
}

inputCep.addEventListener("blur", () => {
  // Para verificar se foram digitados a quantidade de números de um CEP (8 números)
  let cep = inputCep.value;
  if (cep.length !== 8) {
    alert("CEP inválido");
    return;
  }

  // Para buscar os elementos na API
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    // Para que a resposta seja apenas o conteúdo em formato JSON
    .then((resposta) => resposta.json())
    // Pegar apenas as informações que seram usadas na aplicação
    .then((json) => {
      inputLogradouro.value = json.logradouro;
      inputBairro.value = json.bairro;
      inputCidade.value = json.localidade;
      inputUF.value = json.uf;

      // Verificar se o campo Número está vazio
      if (inputNumero.value.trim() === "") {
        // Definir o foco no campo Número
        inputNumero.focus();
      } else {
        // Caso contrário, adicionar um pequeno atraso antes de chamar a função para definir o foco
        setTimeout(() => {
          focusOnFirstEmpty();
        }, 10);
      }
    });
});

// // Adicionando o footer via JS

// Criando os elementos do footer
const footer = document.createElement("footer");

// Criando o contêiner interno
const footerContainer = document.createElement("div");
footerContainer.classList.add("footer"); // Adicionando classe para estilização

// Criando logo
const logo = document.createElement("a");
logo.classList.add("logo-footer");
logo.href = ""; // Definir href se necessário

// Criando spans separados para JH e Developer
const spanJH = document.createElement("span");
spanJH.classList.add("logo-footer");
spanJH.innerText = "JH";

const spanDeveloper = document.createElement("span");
spanDeveloper.classList.add("logo-footer");
spanDeveloper.innerText = "Developer";

// Adicionando spans ao âncora do logo
logo.appendChild(spanJH);
logo.appendChild(spanDeveloper);

// Criando seção de direitos reservados
const reserved = document.createElement("div");
reserved.classList.add("reserved");
const reservedText = document.createElement("p");
reservedText.innerText = "© 2024 JHDeveloper. Todos os direitos reservados.";
reserved.appendChild(reservedText);

// Criando contêiner de links sociais
const link = document.createElement("div");
link.classList.add("links-footer");

// Criando link do Linkedin
const linkedinLink = document.createElement("a");
linkedinLink.href = "https://www.linkedin.com/in/jhonatan-silva-834773292";
const linkedinImg = document.createElement("img");
linkedinImg.src = "./images/linkedin.png";
linkedinImg.alt = "LinkedIn";
linkedinLink.appendChild(linkedinImg);

// Criando link do Github
const githubLink = document.createElement("a");
githubLink.href = "https://github.com/JhonatanSilva90";
const githubImg = document.createElement("img");
githubImg.src = "./images/github.png";
githubImg.alt = "GitHub";
githubLink.appendChild(githubImg);

// Adicionando elementos aos seus contêineres
link.appendChild(linkedinLink);
link.appendChild(githubLink);
footerContainer.appendChild(logo);
footerContainer.appendChild(reserved);
footerContainer.appendChild(link);

// Adicionando contêiner ao footer
footer.appendChild(footerContainer);

// Adicionando footer ao corpo
document.body.appendChild(footer);
