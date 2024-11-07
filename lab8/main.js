//1

document.addEventListener("DOMContentLoaded", () => {

const frase = document.querySelector("#mensagem");

const mudaFrase = () => {
  if (frase.innerHTML === "1. Passa por aqui!") {
    frase.innerHTML = "1. Obrigado por passares!";
  }
};
const restauraFrase = () => {
  frase.innerHTML = "1. Passa por aqui!";
};

frase.addEventListener("mouseover", mudaFrase);
frase.addEventListener("mouseout", restauraFrase);
});



//2
const pintaMe = document.querySelector("#pintar");
const colorButtons = document.querySelectorAll(".color-button");

function alteraCor() {
  const color = colorButtons.dataset.color;
  pintaMe.style.color = color;
}

colorButtons.forEach((button) => {
  button.addEventListener("click", alteraCor);
});



//3
const texto = document.querySelector("#texto3");
const cores = ["red", "green", "blue", "yellow", "gray"];
let colorIndex = 0;

function alteraCorBackground() {
  texto.style.backgroundColor = cores[colorIndex];
  colorIndex = (colorIndex + 1) % cores.length;
}

texto.addEventListener("input", alteraCorBackground);
texto.addEventListener("change", alteraCorBackground);



//4

document.querySelector("select").onchange = function () {
document.querySelector("body").style.backgroundColor = this.value;
};



//5
if (!localStorage.getItem("counter")) {
  localStorage.setItem("counter", 0);
}

const butao = document.querySelector(".contar");
const numero = document.querySelector("#numero");

let counter = Number(localStorage.getItem("counter"));

numero.innerText = counter;

function aumentaNumero() {
  counter++;
  numero.innerText = counter;
  localStorage.setItem("counter", counter);
}

butao.addEventListener("click", aumentaNumero);



//6

const nome = document.querySelector("#nome");
const idade = document.querySelector("#idade");
const dados = document.querySelector("#dados");
const form = document.querySelector("#myForm");

document.querySelector("form").onsubmit = (e) => {
  e.preventDefault(); // Prevent the form from submitting
  dados.innerHTML = `Olá, o ${nome.value} tem ${idade.value}!`;
};

form.onsubmit = escreveDados;


//7

let counterSpan = 0;
const span = document.querySelector("span");
function count() {
  span.innerHTML = ++counterSpan;
}
setInterval(count, 1000);
