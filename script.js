const products = [
    {id: 1, name: 'Winston', price: 9.50, image: 'https://th.bing.com/th/id/OIP.xaA0NB4sDhCRGo-7vFexSgHaHa?w=164&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'},
    {id: 2, name: 'Marlboro', price: 10.00, image: 'https://www.bing.com/th?id=OIP.9xIQOytKQKyv88rVMfnjVgHaHa&w=147&h=150&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'},
    {id: 3, name: 'Mighty Green', price: 8.50, image: 'https://www.bing.com/th?id=OIP.rkdoJNZdX4prKevIo7ujWgAAAA&w=113&h=106&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'},
    {id: 4, name: 'Champion', price: 7.00, image: 'https://th.bing.com/th/id/OIP.uiUqtVyWhPn3nyE8oH97mAAAAA?w=153&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7'}
];

let cart = [];

function showProducts() {
    document.getElementById('products').innerHTML = products.map(p => `
        <div class="product">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>₱${p.price.toFixed(2)}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(id) {
    let product = products.find(p => p.id === id);
    let cartItem = cart.find(item => item.id === id);
    
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    let cartDiv = document.getElementById('cart');
    if (cart.length === 0) {
        cartDiv.innerHTML = 'Your cart is empty';
    } else {
        cartDiv.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h3>${item.name}</h3>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Price: ₱${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button class="remove" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');
    }

    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total').textContent = total.toFixed(2);
}

window.onload = showProducts;