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

      // Adicionar um pequeno atraso antes de chamar a função para definir o foco
      setTimeout(() => {
        focusOnFirstEmpty();
      }, 10);
    });
});
