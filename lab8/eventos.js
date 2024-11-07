// 1. Alterar a cor do título ao passar o mouse
const titulo = document.querySelector("h1");
titulo.addEventListener("mouseover", () => {
  titulo.style.color = "blue";
});
titulo.addEventListener("mouseout", () => {
  titulo.style.color = "black";
});

// 2. Mudar o texto de um parágrafo ao clicar
const paragrafoDescobertas = document.querySelector("p");
paragrafoDescobertas.addEventListener("click", () => {
  paragrafoDescobertas.textContent =
    "Estas são algumas descobertas interessantes!";
});

// 3. Exibir um alerta ao clicar no botão "Página Inicial"
const botaoHome = document.querySelector("a button");
botaoHome.addEventListener("click", (event) => {
  event.preventDefault(); // Evita o redirecionamento imediato
  alert("Você será redirecionado para a página inicial.");
  window.location.href = "/index.html"; // Redireciona após o alerta
});

// 4. Alterar a imagem do IP do PC ao passar o mouse
const imagemIPPC = document.querySelector("img[src='images/IPPC.png']");
imagemIPPC.addEventListener("mouseover", () => {
  imagemIPPC.src = "images/IPSITE.png"; // Imagem alternativa
});
imagemIPPC.addEventListener("mouseout", () => {
  imagemIPPC.src = "images/IPPC.png"; // Retorna à imagem original
});

// 5. Mostrar um IP aleatório ao clicar no IP do PC
const ipPC = document.querySelectorAll("p")[1];
ipPC.addEventListener("click", () => {
  const randomIP = `${Math.floor(Math.random() * 255)}.${Math.floor(
    Math.random() * 255
  )}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  ipPC.textContent = `IP Aleatório: ${randomIP}`;
});
