function renderCart() {
    const cartContainer = document.getElementById("cart-container");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => {
        const precioNum = typeof item.precio === 'number' ? item.precio : 0;
        const cantidadNum = Number(item.cantidad) || 0;
        return sum + (precioNum * cantidadNum);
    }, 0);

    if (cart.length === 0) {
        cartContainer.innerHTML = "<div class='alert alert-info'>Tu carrito está vacío</div>";
        return;
    }

    const table = document.createElement("table");
    table.className = "table table-bordered table-hover";

    const rows = cart.map((item, index) => {
        const titulo = item.titulo && !item.titulo.startsWith('${') ? item.titulo : "Servicio desconocido";
        const precio = typeof item.precio === 'string' && item.precio.startsWith('${')
            ? "Consultar"
            : item.precio;

        const precioNum = typeof precio === 'number' ? precio : 0;
        const cantidadNum = Number(item.cantidad) || 0;
        const subtotal = precioNum * cantidadNum;

        return `
            <tr>
                <td>${titulo}</td>
                <td>${typeof item.precio === "number" ? "ARS " + item.precio.toLocaleString() : item.precio}</td>
                <td>${cantidadNum}</td>
                <td>${precioNum > 0 ? "ARS " + subtotal.toLocaleString() : "-"}</td>
                <td>
                    <button class="btn btn-sm btn-danger btn-remove" data-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join("");

    table.innerHTML = `
        <thead>
            <tr>
                <th>Servicio</th>
                <th>Precio Unitario</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>${rows}</tbody>
        <tfoot>
            <tr>
                <th colspan="3">Total</th>
                <th>ARS ${total.toLocaleString()}</th>
                <th></th>
            </tr>
        </tfoot>
    `;

    cartContainer.innerHTML = "";
    cartContainer.appendChild(table);
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function vaciarCarrito() {
    localStorage.removeItem("cart");
    renderCart();
}

function confirmarCompra() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    alert("Gracias por tu compra. Te contactaremos por email.");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();

    document.getElementById('cart-container').addEventListener('click', function(event) {
        const removeButton = event.target.closest('.btn-remove');
        if (removeButton) {
            const index = removeButton.dataset.index;
            removeFromCart(Number(index));
        }
    });

    const vaciarBtn = document.getElementById('vaciar-carrito-btn');
    if (vaciarBtn) {
        vaciarBtn.addEventListener('click', vaciarCarrito);
    }

    const confirmarBtn = document.getElementById('confirmar-compra-btn');
    if (confirmarBtn) {
        confirmarBtn.addEventListener('click', confirmarCompra);
    }
});