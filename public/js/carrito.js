function renderCart() {
    const cartContainer = document.getElementById("cart-container");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = "<div class='alert alert-info'>Tu carrito está vacío</div>";
        return;
    }

    let total = 0;
    const table = document.createElement("table");
    table.className = "table table-bordered table-hover";

    // Safely build rows
    const rows = cart.map((item, index) => {
        try {
            // Ensure all required fields exist
            const titulo = item.titulo || "Servicio desconocido";
            const precio = typeof item.precio === "number" ? item.precio : 
                        (item.precio === "Consultar" ? 0 : parseFloat(item.precio) || 0);
            const cantidad = item.cantidad || 0;
            const subtotal = precio * cantidad;
            total += subtotal;

            return `
                <tr>
                    <td>${titulo}</td>
                    <td>${typeof item.precio === "number" ? "ARS " + item.precio.toLocaleString() : item.precio}</td>
                    <td>${cantidad}</td>
                    <td>${precio ? "ARS " + subtotal.toLocaleString() : "-"}</td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        } catch (error) {
            console.error("Error rendering cart item:", item, error);
            return "";
        }
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

        document.addEventListener("DOMContentLoaded", renderCart);