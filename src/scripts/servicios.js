//estructura de servicios
[

    {
    "id": "carpeta1",
    "categoria": "carpetas",
    "titulo": "Armado de árbol genealógico",
    "descripcion": "Búsqueda desde la persona interesada hasta el italiano.",
    "precio": 45000,
    "imagen": "resources/papers.jpg" 
    },

    {
    "id": "carpeta2",
    "categoria": "carpetas",
    "titulo": "Pedido de actas",
    "descripcion": "Solicitud de las actas de nacimiento, matrimonio y defunción legalizadas.",
    "precio": "Consultar",
    "imagen": "resources/papers.jpg" 
    },

    {
    "id": "carpeta3",
    "categoria": "carpetas",
    "titulo": "Apostillado",
    "descripcion": "Apostille de la Haya",
    "precio": "50000",
    "imagen": "resources/papers.jpg" 
    },

    {
    "id": "carpeta4",
    "categoria": "carpetas",
    "titulo": "Apostillado Urgente",
    "descripcion": "Apostille de la Haya en 7 días.",
    "precio": "80000",
    "imagen": "resources/papers.jpg" 
    },

    {
    "id": "inscripcion1",
    "categoria": "inscripcion",
    "titulo": "Fast It",
    "descripcion": "Sitio Oficial del Consulado.",
    "precio": 45000,
    "imagen": "resources/papers.jpg"
    },

    {
    "id": "inscripcion2",
    "categoria": "inscripcion",
    "titulo": "Prenotami",
    "descripcion": "Para solicitud de pasaportes.",
    "precio": 25000,
    "imagen": "resources/papers.jpg"
    },

    {
    "id": "traduccion1",
    "categoria": "traduccion",
    "titulo": "Traducción Italiana de actas",
    "descripcion": "Traducción certificada de actas de nacimiento, matrimonio y defunción.",
    "precio": 45000,
    "imagen": "resources/papers.jpg"
    },

    {
    "id": "traduccion2",
    "categoria": "traduccion",
    "titulo": "Traducción Italiana de Sentencias",
    "descripcion": "Traducción certificada de sentencias de divorcio o adopción.",
    "precio": "Consultar",
    "imagen": "resources/papers.jpg"
    },

]

//agregar servicios
function adjustQty(button, delta) {
    const container = button.closest(".quantity-controls");
    const quantityEl = container.querySelector(".quantity");
    let quantity = parseInt(quantityEl.textContent);

    quantity += delta;
    if (quantity < 0) quantity = 0;

    quantityEl.textContent = quantity;
}

//agregar dependiendo de la categoria del servicio
const categoriaActual = "carpetas";

fetch("servicios.json")
    .then(response => response.json())
    .then(servicios => {
    const container = document.createElement("div");
    container.className = "d-flex flex-wrap justify-content-center gap-3 mt-5";

    servicios
    .filter(servicio => servicio.categoria === categoriaActual)
    .forEach(servicio => {
        const card = document.createElement("div");
        card.className = "card service-card";
        card.innerHTML = `
        <img src="${servicio.imagen}" class="card-img-top" alt="${servicio.titulo}">
        <div class="card-body">
            <h5 class="card-title">${servicio.titulo}</h5>
            <p class="card-text">${servicio.descripcion}</p>
            <p class="price">${typeof servicio.precio === "number" ? "ARS " + servicio.precio.toLocaleString() : servicio.precio}</p>
            <div class="quantity-controls">
                <button class="btn btn-sm btn-outline-secondary" onclick="adjustQty(this, -1)">−</button>
                <span class="quantity">0</span>
                <button class="btn btn-sm btn-outline-secondary" onclick="adjustQty(this, 1)">+</button>
            </div>
        </div>
        `;
        container.appendChild(card);
        });

    document.body.appendChild(container);
});