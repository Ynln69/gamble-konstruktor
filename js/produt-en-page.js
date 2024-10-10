const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

fetch("../../products-data-en.json")
  .then((response) => response.json())
  .then((data) => {
    const product = data.products.find((p) => p.id == productId);

    if (product) {
      const productMarkup = `
          <div>
            <img src="${product.photo}" alt="${product.title}" class="product-image" />
          </div>
          <div class="product-info">
            <h2 class="product-info-title" >${product.title}</h2>
            <p class="product-info-price">${product.price} PLN</p>
            <p class="product-info-description">${product.description}</p>
          </div>
      `;

      document.getElementById("product-container").innerHTML = productMarkup;
    } else {
      console.error("Продукт не знайдено");
    }
  })
  .catch((error) => console.error("Помилка при завантаженні JSON:", error));
