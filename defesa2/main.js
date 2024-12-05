// Function to load products into the grid container
function carregarProdutos(produtos) {
  const gridContainer = document.querySelector(".grid-container");
  gridContainer.innerHTML = ""; // Clear existing products
  const button = document.getElementById("menos-info");


  produtos.forEach(function (produto) {
    const sectionProduto = criarProduto(produto);
    gridContainer.appendChild(sectionProduto);
  });
  button.addEventListener("click", () => {
    produtos.forEach(function (produto) {
    produto.description = "";
    carregarProdutosMenosInfo(produtos);
  });
});
}

function carregarProdutosMenosInfo(produtos) {
  const gridContainer = document.querySelector(".grid-container");
  produtos.forEach(function (produto) {
    const sectionProduto = menosInfo(produto);
    gridContainer.appendChild(sectionProduto);
  });
}




// Function to fetch products with optional filters
function fetchProdutos(categoria = "", ordernacao = "", pesquisa = "") {
  let getProdutos = "https://deisishop.pythonanywhere.com/products/";

  const button = document.getElementById("menos-info");

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
        produtosFiltrados = produtosFiltrados.sort((a, b) => a.rating.rate - b.rating.rate);
      } else if (ordernacao === "highest") {
        produtosFiltrados = produtosFiltrados.sort((a, b) => b.rating.rate - a.rating.rate);
      }

      if (pesquisa) {
        produtosFiltrados = produtosFiltrados.filter((produto) =>
          produto.title.toLowerCase().includes(pesquisa.toLowerCase())
        );
      }

      if(pesquisa){
        produtosFiltrados = produtosFiltrados.filter((produto) =>
          produto.description.includes(pesquisa)
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

// Create product grid item
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
    adicionaProdutoAoCesto(produto);
  });

  article.append(title, img, price, description, button);
  return article;
}

// Create product grid item
function menosInfo(produto) {
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

  const button = document.createElement("button");
  button.classList.add("button-product");
  button.textContent = "Adicionar ao Cesto";

  button.addEventListener("click", () => {
    adicionaProdutoAoCesto(produto);
  });

  article.append(title, img, price, button);
  return article;
}

// Add product to cart
function adicionaProdutoAoCesto(produto) {
  const cestoContainer = document.querySelector(".cesto");
  const cestoProduto = criarProdutoNoCesto(produto);
  cestoContainer.appendChild(cestoProduto);
  guardarProdutoCesto(produto);
  calcularPrecoTotal();
}

function adicionaTodos(produto){
  const cesto = document.querySelector(".cesto");
  const butao = document.querySelector(".add-all-button")
  const produtoCesto = criaProdutoNoCesto(produto);

    butao.addEventListener("click", () => {
      produto.forEach((produto) => {
      produtoCesto.append(criarProdutoNoCesto(produto));
      cesto.appendChild(produtoCesto);
      guardarProdutoCesto(produto);
      calcularPrecoTotal(); 
    });
  });
}

// Create product item in cart
function criarProdutoNoCesto(produto) {
  const cesto = document.createElement("section");
  cesto.classList.add("grid-item");

  const titulo = document.createElement("h1");
  titulo.classList.add("title-product");
  titulo.textContent = produto.title;

  const imagem = document.createElement("img");
  imagem.src = produto.image;
  imagem.alt = produto.title;

  const preco = document.createElement("p");
  preco.textContent = `Custo total: ${produto.price}€`;

  const descricao = document.createElement("p");
  descricao.classList.add("description-product");
  descricao.textContent = produto.description;

  const botao = document.createElement("button");
  botao.textContent = "- Remover do cesto";
  botao.classList.add("button-product"); // Adding the class here
  botao.addEventListener("click", () => {
    removerProdutoDoCesto(produto, cesto);
  });


  cesto.append(titulo, imagem, preco, descricao, botao);
  return cesto;
}

// Remove product from cart
function removerProdutoDoCesto(produto, cesto) {
  const cestoContainer = document.querySelector(".cesto");
  cestoContainer.removeChild(cesto);

  let cestoProdutos = JSON.parse(localStorage.getItem("cestoProdutos")) || [];
  cestoProdutos = cestoProdutos.filter((item) => item.id !== produto.id);
  localStorage.setItem("cestoProdutos", JSON.stringify(cestoProdutos));
  calcularPrecoTotal();
}

// Save product in localStorage
function guardarProdutoCesto(produto) {
  const cestoProdutos = JSON.parse(localStorage.getItem("cestoProdutos")) || [];
  cestoProdutos.push(produto);
  localStorage.setItem("cestoProdutos", JSON.stringify(cestoProdutos));
}

// Update cart on page load
function atualizaCesto() {
  const cestoContainer = document.querySelector(".cesto");
  const cestoProdutos = JSON.parse(localStorage.getItem("cestoProdutos")) || [];
  cestoProdutos.forEach((produto) => {
    const cestoProduto = criarProdutoNoCesto(produto);
    cestoContainer.appendChild(cestoProduto);
  });
  calcularPrecoTotal();
}

// Calculate total price
function calcularPrecoTotal() {
  const cestoProdutos = JSON.parse(localStorage.getItem('cestoProdutos')) || [];
  const precoTotal = cestoProdutos.reduce((total, produto) => total + produto.price, 0);

  const cestoContainer = document.querySelector('.cesto');
  let precoTotalElemento = document.querySelector('.price-cesto');

  if (!precoTotalElemento) {
    precoTotalElemento = document.createElement('h1');
    precoTotalElemento.classList.add('price-cesto');
    cestoContainer.prepend(precoTotalElemento);
  }

  precoTotalElemento.textContent = `Preço Total: ${precoTotal.toFixed(2)}€`;
}


// Event listeners for ordering and search
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


document
  .getElementById("comprar-button")
  .addEventListener("click", function () {
    const totalOriginal = 23.43; // O valor original do pedido, por exemplo, 23.43€

    // Aplica os descontos
    const totalComDescontos = aplicarDescontos(totalOriginal);

    // Faz a requisição para o endpoint /buy
    comprar(totalComDescontos);
  });

function aplicarDescontos(total) {
  const isEstudante = document.getElementById("estudante-checkbox").checked;
  const cupaoInput = document.getElementById("cupao-input").value.trim();

  let descontoEstudante = 0;
  let descontoCupao = 0;

  // Aplica 10% de desconto se for estudante
  if (isEstudante) {
    descontoEstudante = total * 0.1;
  }

  // Valida o cupão e aplica o desconto
  if (cupaoInput === "20OFF") {
    descontoCupao = total * 0.2;
  } else if (cupaoInput !== "") {
    document.getElementById("compra-resultado").textContent = "Cupão inválido!";
    return total; // Não aplica desconto se cupão for inválido
  }

  // Calcula o total final com descontos aplicados
  const totalComDescontos = total - descontoEstudante - descontoCupao;

  // Mostra os descontos aplicados
  document.getElementById(
    "compra-resultado"
  ).textContent = `Desconto aplicado: -${(
    descontoEstudante + descontoCupao
  ).toFixed(2)}€`;
  return totalComDescontos;
}

function comprar(total) {
  const data = {
    products: produtos,
    student: estudante,
    coupon: cupom,
  };

  // Faz a requisição POST para o endpoint /buy
  fetch("https://deisishop.pythonanywhere.com/buy/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then((responseData) => {
      if (responseData.error) {
        document.getElementById(
          "compra-resultado"
        ).textContent = `Erro: ${responseData.error}`;
      } else {

        document.getElementById(
          "compra-resultado"
        ).textContent = `Referência para pagamento: ${responseData.reference}, Total a pagar: ${responseData.totalCost}€`;
      }
    })
    .catch((error) => {
      document.getElementById(
        "compra-resultado"
      ).textContent = `Erro ao processar o pagamento: ${error.message}`;
    });
}







// Page load
document.addEventListener("DOMContentLoaded", () => {
  fetchProdutos();
  fetchCategorias();
  atualizaCesto();
});
