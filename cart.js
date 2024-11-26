// let cart = JSON.parse(localStorage.getItem('cart')) || [];

// function updateCart() {
//     const cartItemsContainer = document.getElementById('cart-items');
//     const cartTotal = document.getElementById('cart-total');
//     const placeOrderButton = document.querySelector('.place-order-btn'); // Query the existing button
    
//     // Verify that elements exist
//     if (!cartItemsContainer || !cartTotal || !placeOrderButton) {
//         console.error("Required elements not found in the DOM.");
//         return;
//     }

//     cartItemsContainer.innerHTML = '';  // Clear current items
//     let total = 0;                      // Initialize total amount

//     if (cart.length === 0) {
//         const emptyMessage = document.createElement('p');
//         emptyMessage.textContent = "Your cart is empty.";
//         emptyMessage.className = "empty-cart-message";
//         cartItemsContainer.appendChild(emptyMessage);
//     } else {
//         cart.forEach((item, index) => {
//             total += item.price * item.quantity;

//             const cartItem = document.createElement('div');
//             cartItem.className = 'cart-item';
//             cartItem.innerHTML = `
//                 <p class="cart-item-name">${item.name} x${item.quantity}</p>
//                 <p class="cart-item-price">R${(item.price * item.quantity).toFixed(2)}</p>
//                 <button onclick="deleteItem(${index})" class="delete-item-btn">Delete</button>
//             `;
//             cartItemsContainer.appendChild(cartItem);
//         });
//     }

//     // Update total amount
//     cartTotal.textContent = `Total: R${total.toFixed(2)}`;
    
//     // Ensure the "Place Order" button is always visible
//     placeOrderButton.style.display = 'block';
// }


// function deleteItem(index) {

//     cart.splice(index, 1);
//     localStorage.setItem('cart', JSON.stringify(cart));

//     updateCart();
// }

// function finalizeOrder() {
//     if (cart.length === 0) {
//         alert("Your cart is empty!");
//         return;
//     }

//     const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
//     const orderDetails = {
//         email: prompt("Enter your email to receive the invoice:"),
//         cart: cart.map(item => ({
//             name: item.name,
//             quantity: item.quantity,
//             price: item.price
//         })),
//         total: total
//     };

//     if (!orderDetails.email) {
//         alert("Email is required to send the invoice.");
//         return;
//     }

  
//     const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1ZGRsZmx0bWtiemNra3VpcGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1OTMyNDgsImV4cCI6MjA0NzE2OTI0OH0.W0HSWVCl5ejWTTOqrtVDorqhWBULkOj6maofkL1LNII'
//     fetch('https://yuddlfltmkbzckkuipcg.supabase.co/functions/v1/send-invoice', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${SUPABASE_API_KEY}`,
//         },
//         body: JSON.stringify(orderDetails),
//     })
//     .then(response => {
//         if (!response.ok) {
//             return response.json().then((error) => {
//                 throw new Error(error.error || "Unknown error occurred");
//             });
//         }
//         return response.json();
//     })
//     .then(data => {
//         alert("Invoice sent! Check your email.");
//         cart = [];
//         localStorage.removeItem('cart');
//         updateCart();
//     })
//     .catch(error => {
//         console.error("Error sending invoice:", error.message);
//         alert(`An error occurred: ${error.message}`);
//     });
    
   
// }


// updateCart();
