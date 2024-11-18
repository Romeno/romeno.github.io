function carregarProduto(produto) {
  produtos.forEach((produto) => {
    console.log(produto.title);
  });
}





// Cria os produtos
function criarProduto(produto) {
  const article = document.createElement("article");
  article.classList.add("grid-item");

  const title = document.createElement("h1");
  title.classList.add("title-product");
  title.textContent = produto.title;

  const img = document.createElement("img");
  img.classList.add("img-product");
  img.src = produto.image;
  img.alt = produto.title;

  const price = document.createElement("p");
  price.classList.add("price-product");
  price.textContent = `${produto.price}€`;

  const description = document.createElement("p");
  description.classList.add("description-product");
  description.textContent = produto.description;

  const button = document.createElement("button");
  button.classList.add("button-product");
  button.textContent = "Adicionar ao Cesto";

  button.addEventListener("click", () => {
    adicionaProdutoCarrinho(produto);
  });

  article.append(title);
  article.append(img);
  article.append(price);
  article.append(description);
  article.append(button);

  return article;
}





// Remove produtos do cesto
function removeProdutoCarrinho(produtoId) {
  const cestoContainer = document.querySelector(".cesto");
  const article = document.querySelector(`.cesto-item[data-id="${produtoId}"]`);
  if (article) {
    cestoContainer.removeChild(article);
    guardaCarrinho();
    atualizaCustoTotal();
  }
}





// Adiciona produtos ao cesto
function adicionaProdutoCarrinho(produto) {
  const cestoContainer = document.querySelector(".cesto");

  const article = document.createElement("article");
  article.classList.add("grid-item", "cesto-item");
  article.setAttribute("data-id", produto.id);

  const title = document.createElement("h1");
  title.classList.add("title-product");
  title.textContent = produto.title;

  const img = document.createElement("img");
  img.classList.add("img-product");
  img.src = produto.image;
  img.alt = produto.title;

  const price = document.createElement("p");
  price.classList.add("price-product");
  price.textContent = `${produto.price}€`;

  const description = document.createElement("p");
  description.classList.add("description-product");
  description.textContent = produto.description;

  const button = document.createElement("button");
  button.classList.add("button-product");
  button.textContent = "Remover do cesto";

  button.addEventListener("click", () => {
    removeProdutoCarrinho(produto.id);
  });

  article.append(title);
  article.append(img);
  article.append(price);
  article.append(description);
  article.append(button);

  cestoContainer.append(article);
  guardaCarrinho();
  atualizaCustoTotal();
}





// Salva o cesto no localStorage
function guardaCarrinho() {
  const cestoItems = document.querySelectorAll(".cesto-item");
  const cesto = [];

  cestoItems.forEach((item) => {
    const produtoId = item.getAttribute("data-id");
    const produto = produtos.find((p) => p.id == produtoId);
    if (produto) {
      cesto.push(produto);
    }
  });

  localStorage.setItem("cesto", JSON.stringify(cesto));
}





// Carrega o cesto do localStorage
function carregaCarrinho() {
  const cesto = JSON.parse(localStorage.getItem("cesto")) || [];
  cesto.forEach((produto) => {
    adicionaProdutoCarrinho(produto);
  });
  atualizaCustoTotal();
}




//Atualiza o custo total
function atualizaCustoTotal() {
  const cesto = JSON.parse(localStorage.getItem("cesto")) || [];
  const total = cesto.reduce((sum, produto) => sum + produto.price, 0);
  const roundedTotal = total.toFixed(2);
  document.getElementById("price-cesto").textContent = `Custo Total: ${roundedTotal}€`;
}




// Carrega a pagina
document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.querySelector(".grid-container");

  produtos.forEach((produto) => {
    const productArticle = criarProduto(produto);
    gridContainer.appendChild(productArticle);
  });

  carregaCarrinho();
});