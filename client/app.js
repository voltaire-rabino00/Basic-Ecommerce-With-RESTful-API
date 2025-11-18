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

// =================== LOAD FEATURED PRODUCTS ===================
async function loadFeaturedProducts() {
    try {
        const response = await fetch("http://localhost:5000/api/featured");
        const products = await response.json();

        const container = document.getElementById("featuredList");
        container.innerHTML = "";

        products.forEach(product => {   
            container.innerHTML += `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="price">₱${product.price}</div>
                </div>
            `;
        });

    } catch (error) {
        console.error("❌ Error loading featured products:", error);
    }
}

loadFeaturedProducts();

// Contact 
// =================== CONTACT FORM SUBMIT ===================
document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const responseMsg = document.getElementById("responseMessage");
    
    try {
        const res = await fetch("http://localhost:5000/api/contact-messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });

        const data = await res.json();

        if (res.ok) {
            responseMsg.style.color = "green";
            responseMsg.textContent = "Message sent!";
            document.getElementById("contactForm").reset();
        } else {
            responseMsg.style.color = "red";
            responseMsg.textContent = data.message || "Failed to send.";
        }

    } catch (error) {
        responseMsg.style.color = "red";
        responseMsg.textContent = "Server error.";
    }
});


// =================== LOAD TEAM ===================
async function loadTeam() {
    try {
        const res = await fetch("http://localhost:5000/api/team");
        const team = await res.json();

        const container = document.getElementById("teamContainer");

        container.innerHTML = team.map(member => `
            <div class="team-card">
                <img src="${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p class="role">${member.role}</p>
                <p class="desc">${member.description}</p>
                <p class="contact-info">✉ ${member.email}</p>
            </div>
        `).join("");

    } catch (err) {
        console.error("❌ Error loading team:", err);
    }
}

loadTeam();


// =================== SLIDESHOW (FROM PRODUCTS API) ===================
async function loadSlideshow() {
    try {
        const response = await fetch("http://localhost:5000/api/products");
        const products = await response.json();

        const slideshow = document.getElementById("slideshow");

        slideshow.innerHTML = products.map((p, index) => `
            <div class="slide ${index === 0 ? "active" : ""}" 
                style="background-image: url('${p.image}')">
            </div>
        `).join("");

        startSlideshow();

    } catch (error) {
        console.error("❌ Slideshow load error:", error);
    }
}

function startSlideshow() {
    let index = 0;
    const slides = document.querySelectorAll(".slide");

    setInterval(() => {
        slides[index].classList.remove("active");
        index = (index + 1) % slides.length;
        slides[index].classList.add("active");
    }, 3000);
}

loadSlideshow();
    

// Team Api Function
    async function loadTeam() {
        const res = await fetch("http://localhost:5000/api/team");
        const team = await res.json();

        const container = document.getElementById("teamContainer");
        container.innerHTML = team.map(member => `
            <div class="team-card">
                <img src="${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p class="role">${member.role}</p>
                <p class="desc">${member.description}</p>
                <p class="contact-info">✉ ${member.email}</p>
            </div>
        `).join("");
    }

    loadTeam();