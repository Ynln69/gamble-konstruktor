document.addEventListener("DOMContentLoaded", () => {
  const productsPerPage = 6;
  let currentPage = 1;

  fetch("../../products-data-en.json")
    .then((response) => response.json())
    .then((data) => {
      let productsData = data.products;
      const productsList = document.getElementById("our-products");
      const paginationContainer = document.getElementById("pagination");

      if (!productsList) {
        return;
      }

      function displayProducts(page) {
        productsList.innerHTML = "";
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;
        const productsToDisplay = productsData.slice(start, end);

        productsToDisplay.forEach((product) => {
          const li = document.createElement("li");
          li.classList.add("our-products-item");

          li.innerHTML = `
            <a href="../../opis-produktu-en.html?id=${product.id}" class="our-products-link">
            <img src="${product.photo}" alt="${product.title}" class="products-item-img">
            <div class="products-item-thumb">
              <h3 class="products-item-title">
              ${product.title}
              </h3>
              <p class="products-item-desk">
              ${product.title}
              </p>
            </div>
            </a>
            <div class="products-item-wrapper">
              <p class="products-item-price">${product.price} PLN</p>
            </div>
          `;
          productsList.appendChild(li);
        });
      }

      function setupPagination() {
        if (!paginationContainer) {
          return;
        }
        paginationContainer.innerHTML = "";

        const pageCount = Math.ceil(productsData.length / productsPerPage);

        if (pageCount <= 1) {
          return;
        }

        for (let i = 1; i <= pageCount; i++) {
          const button = document.createElement("button");
          button.innerText = i;
          button.classList.add("pagination-button");
          if (i === currentPage) {
            button.classList.add("active");
          }

          button.addEventListener("click", () => {
            currentPage = i;
            displayProducts(currentPage);
            setupPagination();
          });

          paginationContainer.appendChild(button);
        }
      }

      displayProducts(currentPage);
      setupPagination();
    })
    .catch((error) => console.error("Error loading JSON:", error));
});
