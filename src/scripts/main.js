(() => {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    }

    form.classList.add('was-validated')
    }, false)
})
})()

//verificar si está logueado

document.addEventListener("DOMContentLoaded", function () {
    const authItem = document.getElementById("auth-item");
    const authLink = document.getElementById("auth-link");

    const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";

    if (isLoggedIn) {
        authLink.innerHTML = '<i class="bi bi-box-arrow-right"></i> Cerrar Sesión';
        authLink.href = "#";
        authLink.onclick = function (e) {
            e.preventDefault();
            sessionStorage.removeItem("loggedIn");
            window.location.href = "../public/logIn.html";
        };
    } else {
        authLink.innerHTML = '<i class="bi bi-box-arrow-in-right"></i> Iniciar Sesión';
        authLink.href = "logIn.html";
    }
});

//redirigir a Home

document.addEventListener("DOMContentLoaded", function() {

    if (window.location.pathname.includes("logIn.html")) {
        const loginForm = document.querySelector("form.needs-validation");
    }

    if (loginForm) {

    loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" || password === "") {
        alert("Por favor complete ambos campos.");
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Ingrese un correo electrónico válido.");
        return;
    }

    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    sessionStorage.setItem("loggedIn", "true");

    const redirectTo = sessionStorage.getItem("redirectAfterLogin") || "index.html";
    window.location.href = redirectTo;
});}
    });

function logout() {
    sessionStorage.removeItem("loggedIn");
    window.location.href = "../public/logIn.html";
}

//navegar por paginas
const navPages = [
    { title: "Inicio", href: "../public/index.html" },
    { title: "Carpetas", href: "../public/carpetas.html" },
    { title: "Inscripciones", href: "../public/inscripcion.html" },
    { title: "Traducciones", href: "../public/traducciones.html" },
    { title: "Contacto", href: "../public/contact.html" },
    { title: "Carrito", href: "../public/carrito.html" }
];

function createNavbar() {
    const navbar = document.createElement("nav");
    navbar.className = "navbar navbar-expand-lg fixed-top bg-light";

    navbar.innerHTML = `
        <div class="container">
            <a class="navbar-brand fw-bold" href="index.html">Sorrento</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto" id="navbar-links"></ul>
            </div>
        </div>`;

document.body.prepend(navbar);

const ul = document.getElementById("navbar-links");

document.addEventListener("DOMContentLoaded", createNavbar);

  // Añadir elementos del menú
    navPages.forEach(page => {
    const li = document.createElement("li");
    li.className = "nav-item";
    li.innerHTML = `<a class="nav-link" href="${page.href}">${page.title}</a>`;
    ul.appendChild(li);
    });

  // link del auth
    const authLi = document.createElement("li");
    authLi.className = "nav-item";
    authLi.id = "auth-item";

    const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";

    if (isLoggedIn) {
        authLi.innerHTML = `
        <a class="nav-link" href="#" id="auth-link">
        <i class="bi bi-box-arrow-right"></i> Cerrar Sesión
        </a>`;
        authLi.querySelector("#auth-link").addEventListener("click", e => {
        e.preventDefault();
        sessionStorage.removeItem("loggedIn");
        window.location.href = "../public/logIn.html";
    });
    } else {
        authLi.innerHTML = `
        <a class="nav-link" href="../public/logIn.html" id="auth-link">
        <i class="bi bi-box-arrow-in-right"></i> Iniciar Sesión
        </a>`;
    }

    ul.appendChild(authLi);
}

document.addEventListener("DOMContentLoaded", createNavbar);

//agregar el carrito en el session storage

function addToCart(servicioId, titulo, precio){
    let cart =JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item => item.id === servicioId);

    if (existingItem) {
        existingItem.cantidad += 1;
        
    } else{
        cart.push({ id: servicioId, titulo, precio, cantidad:1});
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Servicio agregado al carrito.");
}