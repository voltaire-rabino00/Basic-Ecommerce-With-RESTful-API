const BASE_URL = "http://localhost:5000/api/products";  // ← palitan if needed

async function loadProducts() {
    try {
        const response = await fetch(BASE_URL);
        const products = await response.json();

        const container = document.getElementById("product-list");
        container.innerHTML = "";

        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">₱${product.price}</div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("❌ Error loading products:", error);
    }
}

loadProducts();
