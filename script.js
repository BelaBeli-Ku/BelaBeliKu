let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Tambah produk ke keranjang
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("add-to-cart")) {
        let name = e.target.getAttribute("data-name");
        let price = parseInt(e.target.getAttribute("data-price"));

        let item = cart.find(i => i.name === name);
        if (item) {
            item.qty++;
        } else {
            cart.push({ name, price, qty: 1 });
        }

        saveCart();
        renderCart();
    }
});

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Render isi keranjang
function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const badge = document.querySelector(".badge");

    cartItems.innerHTML = "";
    let total = 0;
    let totalQty = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        totalQty += item.qty;

        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name} (x${item.qty})</span>
                <span>Rp ${item.price * item.qty}</span>
                <button class="remove" onclick="removeItem(${index})">Hapus</button>
            </div>
        `;
    });

    cartTotal.innerText = total;
    badge.innerText = totalQty;
}

function removeItem(i) {
    cart.splice(i, 1);
    saveCart();
    renderCart();
}

// Checkout via WhatsApp
document.getElementById("checkoutWA").addEventListener("click", function() {
    if (cart.length === 0) return alert("Keranjang masih kosong!");

    let message = "Halo, saya ingin memesan:%0A";

    cart.forEach(item => {
        message += `- ${item.name} x${item.qty} = Rp ${item.price * item.qty}%0A`;
    });

    let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    message += `%0ATotal: Rp ${total}`;

    const nomorWA = "6281225694523"; // ganti dengan nomor koperasi
    window.open(`https://wa.me/${nomorWA}?text=${message}`, "_blank");
});

renderCart();
