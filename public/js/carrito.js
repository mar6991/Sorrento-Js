function renderCart() {
    const cartContainer = document.getElementById("cart-container");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(!cartContainer) return

    if (cart.length === 0) {
        cartContainer.innerHTML = "<div class='alert alert-info'>Tu carrito está vacío</div>";
        return;
    }

    const table = document.createElement("table");
    table.className = "table table-bordered table-hover";

    const rows = cart.map((item, index) => {
        
        const titulo = item.titulo || "Servicio desconocido";

        const precio = typeof item.precio === 'number' 
        ? `ARS ${item.precio.toLocaleString('es-AR')}` 
            : item.precio || "Consultar";
        
            const cantidad = item.cantidad || 0;
        
        const precioNum = typeof item.precio === 'number' ? item.precio : 0;
        const subtotal = precioNum * cantidad;

        return `
                <tr>
                    <td>${titulo}</td>
                    <td>${precio}</td>
                    <td>${cantidad}</td>
                    <td>${precio ? "ARS " + subtotal.toLocaleString() : "-"}</td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        
    }).join("");

    const total = cart.reduce((sum, item) => {
        const precioNum = typeof item.precio === 'number' ? item.precio : 0;
        return sum + (precioNum * item.cantidad || 0);
    }, 0);

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
            updateCartCounter()
        }

        function vaciarCarrito() {
            localStorage.removeItem("cart");
            renderCart();
            updateCartCounter()
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

        document.addEventListener("DOMContentLoaded", renderCart);