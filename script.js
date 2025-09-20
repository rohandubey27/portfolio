// Get all the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Get cart-related elements
const cartCountElement = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const closeBtn = document.querySelector('.close-btn');
const cartItemsList = document.getElementById('cart-items-list');
const totalItemsElement = document.getElementById('total-items');
const totalPriceElement = document.getElementById('total-price');

// Initialize cart from local storage or as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update the initial cart display on page load
updateCartUI();

// Event Listeners for buttons and cart
addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // Find the product card for the clicked button
        const productCard = event.target.closest('.product-card');
        const product = {
            name: productCard.querySelector('h3').textContent,
            price: parseFloat(productCard.querySelector('.price').textContent.replace('₹', '')),
            image: productCard.querySelector('img').src
        };

        // Add the product to the cart array
        addItemToCart(product);
    });
});

// Event listener to open the cart modal
cartCountElement.parentElement.addEventListener('click', () => {
    cartModal.style.display = "block";
});

// Event listener to close the cart modal
closeBtn.addEventListener('click', () => {
    cartModal.style.display = "none";
});

// Close the modal if user clicks outside of it
window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
});

// --- Cart Functions ---

// Function to add a new item to the cart
function addItemToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart)); // Save to local storage
    updateCartUI();
    alert(product.name + " added to cart!");
}

// Function to update the entire cart UI
function updateCartUI() {
    cartItemsList.innerHTML = ''; // Clear the list
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        // Create an item element
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name}</span>
            <span>₹${item.price.toFixed(2)}</span>
        `;
        cartItemsList.appendChild(li);

        totalItems++;
        totalPrice += item.price;
    });

    // Update total items and price display
    cartCountElement.textContent = `Cart (${totalItems})`;
    totalItemsElement.textContent = totalItems;
    totalPriceElement.textContent = totalPrice.toFixed(2);
}