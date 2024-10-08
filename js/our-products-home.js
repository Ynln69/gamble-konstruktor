document.addEventListener("DOMContentLoaded", () => {
  fetch("./products-data-home.json")
    .then((response) => response.json())
    .then((data) => {
      let productsData = data.products;
      const productsList = document.getElementById("our-products");

      if (!productsList) {
        return;
      }
      const productsToShow = productsData.slice(0, 3);

      function displayProducts() {
        productsList.innerHTML = "";
        productsToShow.forEach((product) => {
          const li = document.createElement("li");
          li.classList.add("our-products-item");

          const translateKeyTitle = `towary.cardTitle${product.id}`;
          const translateKeyDesc = `towary.cardDesc${product.id}`;

          li.innerHTML = `
            <a href="./opis-produktu.html?id=${
              product.id
            }" class="our-products-link">
            <img src="${product.photo}" alt="${
            product.title
          }" class="products-item-img">
            <div class="products-item-thumb">
              <h3 class="products-item-title" data-translate="${translateKeyTitle}">${i18next.t(
            translateKeyTitle
          )}</h3>
              <p class="products-item-desk" data-translate="${translateKeyDesc}">${i18next.t(
            translateKeyDesc
          )}</p>
            </div>
            </a>
            <div class="products-item-wrapper">
              <p class="products-item-price">${product.price} PLN</p>
            </div>
          `;
          productsList.appendChild(li);
        });
      }

      displayProducts();

      i18next.on("languageChanged", function () {
        displayProducts();
      });
    })
    .catch((error) => console.error("Error loading JSON:", error));
});
