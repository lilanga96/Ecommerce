
const supabaseUrl = 'https://yuddlfltmkbzckkuipcg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1ZGRsZmx0bWtiemNra3VpcGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1OTMyNDgsImV4cCI6MjA0NzE2OTI0OH0.W0HSWVCl5ejWTTOqrtVDorqhWBULkOj6maofkL1LNII';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);



function toggleAuthModal() {
    const modal = document.getElementById("auth-modal");
    if (modal.style.display === "flex") {
        modal.style.display = "none";
    } else {
        modal.style.display = "flex";
    }
}

window.onclick = function(event) {
    const modal = document.getElementById("auth-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};


let isSignUpMode = true;

function toggleAuthMode() {
    const title = document.getElementById("auth-modal-title");
    const toggleText = document.getElementById("auth-toggle-text");

    if (isSignUpMode) {
        title.innerText = "Log In";
        toggleText.innerHTML = `Don't have an account? <a href="#" onclick="toggleAuthMode()">Sign up here</a>`;
        isSignUpMode = false;
    } else {
        title.innerText = "Sign Up";
        toggleText.innerHTML = `Already have an account? <a href="#" onclick="toggleAuthMode()">Log in here</a>`;
        isSignUpMode = true;
    }
}


async function handleAuth() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (isSignUpMode) {
        await signUpUser(email, password);
    } else {
        await loginUser(email, password);
    }

   
    toggleAuthModal();
}


async function signUpUser(email, password) {
    const { user, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.error('Signup error:', error); // Log full error details
        alert('Signup failed: ' + error.message);
    } else {
        alert('Signup successful! Please check your email to verify your account.');
    }
}


async function loginUser(email, password) {
    const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        alert('Login failed: ' + error.message);
    } else {
        alert('Login successful!');
    }
}
const products = [
    { id: 1, name: 'Herbal Tonic', price: 15.99 },
    { id: 2, name: 'Healing Salve', price: 12.50 },
    { id: 3, name: 'Medicinal Tea', price: 8.75 },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];


document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    loadProducts(); 
});


function loadProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = products.map(product => `
        <div class="product-item">
            <h3>${product.name}</h3>
            <p>R${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
        </div>
    `).join('');
}


function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(item => item.id === id);
    
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    
   
    showModal(`${name} added to cart!`);
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cart.reduce((total, item) => total + item.quantity, 0);
}

function showModal(message) {
    const modal = document.getElementById("add-to-cart-modal");
    const modalMessage = document.getElementById("modal-message");

    modalMessage.innerText = message;
    modal.style.display = "block";

   
    setTimeout(() => {
        modal.style.display = "none";
    }, 2000);
}


function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    let total = 0;

    cartItemsContainer.innerHTML = "";
    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <span>${item.name} - R${item.price} x ${item.quantity}</span>
                <span>R${itemTotal}</span>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    });

    document.getElementById("cart-total").innerText = `Total: R${total.toFixed(2)}`;
}


function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
}


function placeOrder() {
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    updateCartCount();
    loadCartItems();
}


if (document.getElementById("cart-items")) {
    loadCartItems();
}


