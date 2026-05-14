// shared utility for client-side cart
function getCart() {
    const raw = localStorage.getItem('cart');
    return raw ? JSON.parse(raw) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = getCart().reduce((sum, i) => sum + (i.quantity || 0), 0);
    const el = document.getElementById('cart-count');
    if (el) el.textContent = count;
}

function addToCart(item) {
    const cart = getCart();
    const existing = cart.find(i => i.id == item.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    saveCart(cart);
    alert('Added "' + item.name + '" to cart');
}

async function addToCartById(id) {
    try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error('Product fetch failed');
        const data = await res.json();
        addToCart({ id, ...data });
    } catch (err) {
        console.error(err);
        alert('Unable to add item to cart');
    }
}

function loadCartPage() {
    const cart = getCart();
    const container = document.getElementById('cart-items');
    if (!container) return;
    container.innerHTML = '';
    let total = 0;
    cart.forEach(i => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${i.images[0]}" alt="${i.name}" style="width:80px;height:auto;" onerror="this.src='https://via.placeholder.com/80?text=${i.name}'"/>
            <span>${i.name}</span>
            <span>₹${i.price}</span>
            <span>Qty: ${i.quantity}</span>
            <button onclick="removeFromCart('${i.id}')">Remove</button>
        `;
        container.appendChild(div);
        total += i.price * i.quantity;
    });
    const totalEl = document.getElementById('cart-total');
    if (totalEl) totalEl.textContent = total.toFixed(2);
}

function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(i => i.id != id);
    saveCart(cart);
    loadCartPage();
}

document.addEventListener('DOMContentLoaded', updateCartCount);