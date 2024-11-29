// Function to load products into the grid container
function carregarProdutos(produtos) {
  const gridContainer = document.querySelector('.grid-container');
  gridContainer.innerHTML = ''; // Clear existing products

  produtos.forEach(function(produto) {
    const sectionProduto = criarProduto(produto);
    gridContainer.appendChild(sectionProduto);
  });
}

// Function to fetch products with optional filters
function fetchProdutos(categoria = "", ordernacao = "", pesquisa = "") {
  let getProdutos = "https://deisishop.pythonanywhere.com/products/";

  fetch(getProdutos)
    .then((response) => response.json())
    .then((produtos) => {
      let produtosFiltrados = produtos;

      if (categoria && categoria !== "all categories") {
        produtosFiltrados = produtosFiltrados.filter(
          (produto) => produto.category === categoria
        );
      }

      if (ordernacao === "lowest") {
        produtosFiltrados = produtosFiltrados.sort((a, b) => a.price - b.price);
      } else if (ordernacao === "highest") {
        produtosFiltrados = produtosFiltrados.sort((a, b) => b.price - a.price);
      }

      if (pesquisa) {
        produtosFiltrados = produtosFiltrados.filter((produto) =>
          produto.title.toLowerCase().includes(pesquisa.toLowerCase())
        );
      }

      carregarProdutos(produtosFiltrados);
    })
    .catch((error) => {
      console.log("Erro produtos", error);
    });
}

// Function to fetch categories and populate the category filter
function fetchCategorias() {
  const getCategorias = "https://deisishop.pythonanywhere.com/categories/";

  fetch(getCategorias)
    .then((response) => response.json())
    .then((categorias) => {
      carregarCategorias(categorias);
    })
    .catch((error) => console.error("Erro categorias", error));
}

// Function to populate the category filter
function carregarCategorias(categorias) {
  const categories = document.getElementById("categories");
  if (!categories) return;

  categorias.forEach((categoria) => {
    const option = document.createElement("option");
    option.value = categoria;
    option.textContent = categoria;
    categories.appendChild(option);
  });

  categories.addEventListener("change", (event) => {
    const categoriaSelecionada = event.target.value;
    const ordering = document.getElementById("ordering").value;
    fetchProdutos(categoriaSelecionada, ordering);
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

// Atualiza o custo total
function atualizaCustoTotal() {
  const cesto = JSON.parse(localStorage.getItem("cesto")) || [];
  const total = cesto.reduce((sum, produto) => sum + parseFloat(produto.price), 0).toFixed(2);
  document.getElementById("price-cesto").textContent = `Custo Total: ${total}€`;
}

// event listener do ordering e search
document.getElementById("ordering").addEventListener("change", (event) => {
  let ordernacao = event.target.value;
  let categoria = document.getElementById("categories").value;
  let pesquisa = document.getElementById("search").value;
  fetchProdutos(categoria, ordernacao, pesquisa);
});

document.getElementById("search").addEventListener("input", (event) => {
  let pesquisa = event.target.value;
  let categoria = document.getElementById("categories").value;
  let ordernacao = document.getElementById("ordering").value;
  fetchProdutos(categoria, ordernacao, pesquisa);
});

// Carrega a pagina
document.addEventListener("DOMContentLoaded", () => {
  fetchProdutos();
  fetchCategorias();
  carregaCarrinho();
});