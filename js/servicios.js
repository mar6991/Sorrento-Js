document.addEventListener("DOMContentLoaded", () => {
    const pageId = document.body.id;
    const categoriaActual = pageId.split('-')[1];

    if (!categoriaActual) {
        console.log("No se definió una categoría para esta página.");
        return;
    }

    const servicesContainer = document.getElementById("services-container");
    if (!servicesContainer) {
        console.error("No se encontró el contenedor con id 'services-container'");
        return;
    }

    fetch('/servicios.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(servicios => {
            const serviciosFiltrados = servicios.filter(servicio => servicio.categoria === categoriaActual);
            renderServices(serviciosFiltrados, servicesContainer);
        })
        .catch(error => {
            console.error("Error al cargar los servicios:", error);
            servicesContainer.innerHTML = `<div class="alert alert-danger">No se pudieron cargar los servicios. Inténtalo de nuevo más tarde.</div>`;
        });
});

function renderServices(servicios, container) {
    container.innerHTML = "";

    if (servicios.length === 0) {
        container.innerHTML = `<div class="alert alert-info">No hay servicios disponibles en esta categoría.</div>`;
        return;
    }

    servicios.forEach(servicio => {
        const card = document.createElement("div");
        card.className = "card service-card";
        card.style.width = "18rem";

        const precioVisible = typeof servicio.precio === "number" ? `ARS ${servicio.precio.toLocaleString()}` : servicio.precio;

        card.innerHTML = `
            <img src="${servicio.imagen}" class="card-img-top" alt="${servicio.titulo}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${servicio.titulo}</h5>
                <p class="card-text">${servicio.descripcion}</p>
                <p class="price mt-auto">${precioVisible}</p>
                <div class="quantity-controls mb-2">
                    <button class="btn btn-sm btn-outline-secondary btn-qty" data-delta="-1">−</button>
                    <span class="quantity mx-2">1</span>
                    <button class="btn btn-sm btn-outline-secondary btn-qty" data-delta="1">+</button>
                </div>
                <button class="btn btn-primary w-100 btn-add-to-cart" 
                        data-id="${servicio.id}" 
                        data-titulo="${servicio.titulo}" 
                        data-precio="${typeof servicio.precio === 'number' ? servicio.precio : 0}">
                    Agregar al carrito
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('click', function(event) {
    if (event.target.matches('.btn-qty')) {
        adjustQty(event.target);
    }
    if (event.target.matches('.btn-add-to-cart')) {
        addToCart(event.target);
    }
});

function adjustQty(button) {
    const controls = button.closest(".quantity-controls");
    const quantityEl = controls.querySelector(".quantity");
    let quantity = parseInt(quantityEl.textContent);
    const delta = parseInt(button.dataset.delta);

    quantity += delta;
    if (quantity < 1) quantity = 1;

    quantityEl.textContent = quantity;
}

function addToCart(button) {
    const cardBody = button.closest('.card-body');
    const quantityEl = cardBody.querySelector('.quantity');
    const quantity = parseInt(quantityEl.textContent);

    const servicio = {
        id: button.dataset.id,
        titulo: button.dataset.titulo,
        precio: parseFloat(button.dataset.precio),
        cantidad: quantity
    };

    if (servicio.precio === 0) {
        alert("Para servicios a consultar, por favor contáctanos directamente.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = cart.findIndex(item => item.id === servicio.id);
    if (existingProductIndex > -1) {
        cart[existingProductIndex].cantidad += servicio.cantidad;
    } else {
        cart.push(servicio);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    button.textContent = '¡Agregado!';
    button.classList.add('btn-success');
    setTimeout(() => {
        button.textContent = 'Agregar al carrito';
        button.classList.remove('btn-success');
        quantityEl.textContent = '1';
    }, 1500);
}