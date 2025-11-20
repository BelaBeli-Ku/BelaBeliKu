let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
}

function updateCartUI() {
    document.getElementById("cart-count").innerText = cart.length;

    let list = "";
    let total = 0;

    cart.forEach((item, i) => {
        list += `<div class="cart-item">
                    ${item.name} - Rp ${item.price.toLocaleString()}
                    <button onclick="removeItem(${i})">❌</button>
                 </div>`;
        total += item.price;
    });

    document.getElementById("cart-items").innerHTML = list;
    document.getElementById("cart-total").innerText = "Rp " + total.toLocaleString();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Checkout WA
function checkoutWA() {
    if (cart.length === 0) return alert("Keranjang kosong!");

    let text = "Halo, saya ingin memesan:%0A%0A";
    cart.forEach(item => {
        text += `- ${item.name} (Rp ${item.price.toLocaleString()})%0A`;
    });

    const total = cart.reduce((a,b)=>a+b.price,0);
    text += `%0ATotal: Rp ${total.toLocaleString()}`;

    const nomor = "6281234567890"; // GANTI DENGAN NOMOR KOPERASI

    window.open(`https://wa.me/${nomor}?text=${text}`, "_blank");
}
