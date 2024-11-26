const supabaseUrl = 'https://yuddlfltmkbzckkuipcg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1ZGRsZmx0bWtiemNra3VpcGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1OTMyNDgsImV4cCI6MjA0NzE2OTI0OH0.W0HSWVCl5ejWTTOqrtVDorqhWBULkOj6maofkL1LNII';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

function clearAuthFields() {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}

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


async function handleAuthButtonClick() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        await supabase.auth.signOut();
        alert("You have been logged out.");
    } else {
        toggleAuthModal(); 
    }
    updateAuthButton(); 
}


async function updateAuthButton() {
    const { data: { user } } = await supabase.auth.getUser();
    const authButton = document.getElementById("auth-button");
    if (user) {
        authButton.innerHTML = '<i class="ri-logout-box-line"></i> Logout';
    } else {
        authButton.innerHTML = '<i class="ri-login-box-line"></i> Log In';
    }
}



let isSignUpMode = false;

function toggleAuthMode() {
    const title = document.getElementById("auth-modal-title");
    const toggleText = document.getElementById("auth-toggle-text");

    isSignUpMode = !isSignUpMode; 

    if (isSignUpMode) {
        title.innerText = "Sign Up";
        toggleText.innerHTML = "Already have an account? <a href='#' onclick='toggleAuthMode()'>Log in here</a>";
    } else {
        title.innerText = "Log In";
        toggleText.innerHTML = "Don't have an account? <a href='#' onclick='toggleAuthMode()'>Sign up here</a>";
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
    updateAuthButton();  
}


async function signUpUser(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        alert('Signup failed: ' + error.message);
    } else {
        alert('Signup successful! Please check your email to verify your account.');
        toggleAuthModal(); 
        clearAuthFields(); 
        console.log('Logged in user:', data.user);
        updateAuthButton();
    }
}

async function loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        alert('Login failed: ' + error.message);
    } else {
        alert('Login successful!');
        toggleAuthModal();
        clearAuthFields();
        console.log('Logged in user:', data.user);
        updateAuthButton();
    }
}


document.addEventListener("DOMContentLoaded", () => {
    updateAuthButton();
});
const products = [
    { id: 1, name: 'Ibala', price: 20.00 },
    { id: 2, name: 'Smoothie', price: 50.00 },
    { id: 3, name: 'Ibhola Lovuyo', price: 50.00 },
    { id: 4, name: 'Umthi Wokuhlamba', price: 100.00 },
    { id: 5, name: 'Phindisa Isichitho', price: 100.00 },
    { id: 6, name: 'Cacisa amaphupha', price: 100.00 },
    { id: 7, name: 'Vulintlahla', price: 100.00 },
    { id: 8, name: 'Umthi wesilwane', price: 100.00 },
    { id: 9, name: 'Sweet talker', price: 100.00 },
    { id: 10, name: 'Isabunge', price: 100.00 },
    { id: 11, name: 'Umsebenzi wendawo', price: 100.00 },
    { id: 12, name: 'Amacelebrity', price: 100.00 },
    { id: 13, name: 'Pepper steak', price: 100.00 },
    { id: 14, name: 'Qhaqha amaqhina', price: 100.00 },
    { id: 15, name: 'Gilindoda', price: 100.00 },
    { id: 16, name: 'Phindisa Izinto Zabaloyi', price: 100.00 },
    { id: 17, name: 'Umthi wokuchela', price: 100.00 },
    { id: 18, name: 'Umusa wocela', price: 100.00 },
    { id: 19, name: 'Intlambuluko', price: 100.00 },
    { id: 20, name: 'Cisha insthaba', price: 100.00 },
    { id: 21, name: 'Navigator', price: 100.00 },
    { id: 22, name: 'Shukumisa ibhedi(Yogi)', price: 100.00 },
    { id: 23, name: 'Zifozonke', price: 100.00 },
    { id: 24, name: 'Xabana Bodwa', price: 100.00 },
    { id: 25, name: 'Thethisa Abathakathi', price: 100.00 },
    { id: 26, name: 'Umagudluza', price: 100.00 },
    { id: 27, name: 'Vaseline', price: 120.00 },
    { id: 28, name: 'Iyeza lebekelo', price: 250.00 },
    { id: 29, name: 'Dabula amafu', price: 150.00 },
    { id: 30, name: 'Thandeka ebantwini', price: 100.00 },
    { id: 31, name: 'Woza', price: 100.00 },
    { id: 32, name: 'Isiqhumiso somoya', price: 100.00 },
    { id: 33, name: 'Iyeza ledliso', price: 300.00 },
    { id: 34, name: 'Umthi wemali', price: 150.00 },
    { id: 35, name: 'Modules', price: 550.00 },
    { id: 36, name: 'Intambo/Ispaji', price: 750.00 },
    { id: 37, name: 'Amanzi amnyama', price: 100.00 },
    { id: 38, name: 'Iyeza lesilonda', price: 750.00 },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];


const sliderWrapper = document.getElementById("slider-wrapper");
let currentSlide = 0;
let filteredProducts = products;


function groupProducts(products, groupSize = 12) {
    const groups = [];
    for (let i = 0; i < products.length; i += groupSize) {
        groups.push(products.slice(i, i + groupSize));
    }
    return groups;
}


function renderGroupedProducts(productList = products) {
    const groupedProducts = groupProducts(productList);
    sliderWrapper.innerHTML = groupedProducts.map(group => 
        `<div class="slider-group">
            ${group.map(product => 
                `<div class="product-item">
                    <h3>${product.name}</h3>
                    <p>R${product.price.toFixed(2)}</p>
                    <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
                </div>`
            ).join('')}
        </div>`
    ).join('');
}




function slide(direction) {
    const totalSlides = Math.ceil(products.length / 12);
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    const offset = currentSlide * -100;
    sliderWrapper.style.transform = `translateX(${offset}%)`;
}


document.addEventListener("DOMContentLoaded", () => {
    renderGroupedProducts(filteredProducts);
    updateCartCount();
});



document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    loadProducts(); 
});

function filterProducts() {
    const searchValue = document.getElementById("search-input").value.toLowerCase();
    filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchValue)
    );

    renderGroupedProducts(filteredProducts);
}


function displayFilteredProducts(filteredProducts) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = filteredProducts.map(product => 
        `<div class="product-item">
            <h3>${product.name}</h3>
            <p>R${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
        </div>`
    ).join('');
}




function loadProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = products.map(product => 
        `<div class="product-item">
            <h3>${product.name}</h3>
            <p>R${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
        </div>`
    ).join('');

    displayFilteredProducts(products);
}


document.addEventListener("DOMContentLoaded", () => {
    renderGroupedProducts(filteredProducts);
    updateCartCount();
});


async function addToCart(id, name, price) {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        console.error('Error fetching user:', error ? error.message : 'User not logged in');
        alert("Please log in to add items to your cart.");
        toggleAuthModal();  
        return;
    }

   
    const { data: existingItems, error: fetchError } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', id);

    if (fetchError) {
        console.error('Error fetching cart items:', fetchError.message);
        return;
    }

    let item = existingItems[0];

    if (item) {
        
        const { error: updateError } = await supabase
            .from('cart')
            .update({ quantity: item.quantity + 1 })
            .eq('id', item.id);

        if (updateError) {
            console.error('Error updating cart item:', updateError.message);
            return;
        }
    } else {
        
        const { error: insertError } = await supabase
            .from('cart')
            .insert([{ user_id: user.id, product_id: id, name, price, quantity: 1 }]);

        if (insertError) {
            console.error('Error inserting new cart item:', insertError.message);
            return;
        }
    }

    updateCartCount();  
    showModal(`${name} added to cart!`);
}




async function updateCartCount() {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        console.warn("User not logged in. Cart count cannot be updated.");
        document.getElementById("cart-count").innerText = 0; 
        return;
    }

    const { data: cartItems, error: fetchError } = await supabase
        .from('cart')
        .select('quantity')
        .eq('user_id', user.id);

    if (fetchError) {
        console.error('Error fetching cart items:', fetchError.message);
        document.getElementById("cart-count").innerText = 0; 
        return;
    }

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").innerText = cartCount;
}



async function loadCartItems() {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        console.warn("User not logged in. Cart items cannot be loaded.");
        return;
    }

    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");

    if (!cartItemsContainer || !cartTotalElement) {
        console.warn("Required elements not found.");
        return;
    }

    const { data: cartItems, error: fetchError } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', user.id);

    if (fetchError) {
        console.error('Error fetching cart items:', fetchError.message);
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = ""; 

    cartItems.forEach(item => {
        const itemTotal = parseFloat(item.price) * item.quantity;
        total += itemTotal;

        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <span>${item.name} - R${parseFloat(item.price).toFixed(2)} x ${item.quantity}</span>
                <span>R${itemTotal.toFixed(2)}</span>
                <button class="delete-item-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    });

    cartTotalElement.innerText = `Total: R${total.toFixed(2)}`;
}


async function removeFromCart(id) {
    const { error } = await supabase
        .from('cart')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error removing item from cart:', error.message);
        return;
    }

    loadCartItems();
    updateCartCount();
}



async function placeOrder() {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        console.error('Error fetching user:', error ? error.message : 'User not logged in');
        return;
    }

    
    const { data: cartItems, error: fetchError } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', user.id);

    if (fetchError || !cartItems || cartItems.length === 0) {
        console.error('Error fetching cart items or cart is empty:', fetchError ? fetchError.message : '');
        alert("Your cart is empty!");
        return;
    }

   
    let total = 0;
    let invoiceDetails = `<h3>Invoice</h3><p>Thank you for your order! Here are the details:</p><ul>`;
    cartItems.forEach(item => {
        const price = parseFloat(item.price); 
        if (isNaN(price)) {
            console.error('Invalid price:', item.price);
            return;
        }
    
        const itemTotal = price * item.quantity;
        total += itemTotal;
        invoiceDetails += `<li>${item.name} - R${price.toFixed(2)} x ${item.quantity} = R${itemTotal.toFixed(2)}</li>`;
    });
    invoiceDetails += `</ul><p><strong>Total: R${total.toFixed(2)}</strong></p>`;

   
    const recipientEmail = prompt("Please enter your email address to receive the invoice:");

    if (!recipientEmail || !validateEmail(recipientEmail)) {
        alert("Invalid email address. Please try again.");
        return;
    }

   
    const { error: emailError } = await sendInvoiceEmail(recipientEmail, invoiceDetails);

    if (emailError) {
        console.error('Error sending email:', emailError.message);
        alert("Order placed, but we couldn't send the invoice.");
        return;
    }

   
    const { error: deleteError } = await supabase
        .from('cart')
        .delete()
        .eq('user_id', user.id);

    if (deleteError) {
        console.error('Error clearing cart:', deleteError.message);
        return;
    }

    alert("Order placed successfully! Invoice sent to your email.");
    updateCartCount();
    loadCartItems();
}


function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}



async function sendInvoiceEmail(recipientEmail, invoiceDetails) {
    try {
        const response = await fetch('https://yuddlfltmkbzckkuipcg.supabase.co/functions/v1/send-invoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: recipientEmail,
                subject: "Your Invoice from Our Shop",
                html: invoiceDetails,
            }),
        });
        
        console.log("Response from API:", response);
        console.log("Recipient Email:", recipientEmail);
        console.log("Invoice Details:", invoiceDetails);

        
        const responseBody = await response.json();
        console.log("API Response Body:", responseBody);

        if (!response.ok) {
            console.error("Error sending email:", responseBody);
            return { error: new Error(responseBody.message || 'Failed to send email') };
        }
        
        return { error: null }; 
    } catch (error) {
        console.error("Exception occurred while sending email:", error.message);
        return { error };
    }
}





document.addEventListener("DOMContentLoaded", async () => {
    await loadCartItems();
    await updateCartCount();
});
