function renderCart() {
            const cartContainer = document.getElementById("cart-container");
            const cart = JSON.parse(localStorage.getItem("cart")) || [];

            if (cart.length === 0) {
                cartContainer.innerHTML = "<p class='text-muted'>Tu carrito está vacío.</p>";
                return;
            }

            let total = 0;

            const table = document.createElement("table");
            table.className = "table table-bordered table-hover";

            const thead = `
                <thead>
                    <tr>
                        <th>Servicio</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Acción</th>
                    </tr>
                </thead>`;
            
            const rows = cart.map((item, index) => {
                const titulo = item.titulo || "Servicio sin nombre";
                const precio = typeof item.precio === "number" ? item.precio : 0;
                const subtotal = precio * item.cantidad;
                total += subtotal;
                return `
                    <tr>
                        <td>${titulo}</td>
                        <td>${typeof item.precio === "number" ? "ARS " + precio.toLocaleString() : item.precio}</td>
                        <td>${item.cantidad}</td>
                        <td>${subtotal > 0 ? "ARS " + subtotal.toLocaleString() : "-"}</td>
                        <td>
                            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})"><i class="bi bi-trash"></i></button>
                        </td>
                    </tr>
                `;
            }).join("");

            const tfoot = `
                <tfoot>
                    <tr>
                        <th colspan="3" class="text-end">Total</th>
                        <th>${total > 0 ? "ARS " + total.toLocaleString() : "-"}</th>
                        <th></th>
                    </tr>
                </tfoot>`;

            table.innerHTML = thead + "<tbody>" + rows + "</tbody>" + tfoot;
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