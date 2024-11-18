let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <p>${item.name} x${item.quantity}</p>
            <p>R${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="deleteItem(${index})" class="delete-item-btn">Delete</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartTotal.textContent = `Total: R${total.toFixed(2)}`;
}

function deleteItem(index) {
   
    cart.splice(index, 1);

    
    localStorage.setItem('cart', JSON.stringify(cart));

    
    updateCart();
}

function finalizeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let invoice = "Thank you for your order!\n\nOrder Summary:\n";
    cart.forEach(item => {
        invoice += `${item.name} x${item.quantity}: R${(item.price * item.quantity).toFixed(2)}\n`;
    });
    invoice += `\nTotal: R${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`;

    alert("Invoice sent:\n\n" + invoice);
    cart = [];
    localStorage.removeItem('cart');
    updateCart();
}

updateCart();
