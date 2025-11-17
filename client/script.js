// CONTACT FORM SUBMIT
const contactForm = document.getElementById("contactForm");
const responseMessage = document.getElementById("responseMessage");

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    try {
        const res = await fetch("http://localhost:5000/api/contacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
            responseMessage.style.color = "green";
            responseMessage.textContent = "Message sent successfully!";
            contactForm.reset();
        } else {
            responseMessage.style.color = "red";
            responseMessage.textContent = result.error || "Something went wrong.";
        }
    } catch (err) {
        responseMessage.style.color = "red";
        responseMessage.textContent = "Server error. Please try again.";
    }
});
