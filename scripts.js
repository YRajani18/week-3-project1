// Arrays to store the cart and favorite items
let cart = [];
let favorites = [];

// Handle the search functionality
function handleSearch() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const searchResultsContainer = document.getElementById('search-results');

    // Clear previous results
    searchResultsContainer.innerHTML = '';

    if (query) {
        // Filter the products based on the search query
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));

        if (filteredProducts.length > 0) {
            // Display the filtered products
            filteredProducts.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('search-result-item');
                productDiv.innerHTML = `
                    <img src="${product.imgSrc}" alt="${product.name}" class="product-image" width="50">
                    <div class="product-info">
                        <p class="product-name">${product.name}</p>
                        <span class="product-weight">${product.weight}</span>
                        <span class="product-price">${product.price}</span>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart('${product.name}')">Add to Cart</button>
                `;
                searchResultsContainer.appendChild(productDiv);
            });
        } else {
            // If no products match the search, show "Item not available"
            const noResultsMessage = document.createElement('p');
            noResultsMessage.classList.add('no-results');
            noResultsMessage.textContent = 'Item not available';
            searchResultsContainer.appendChild(noResultsMessage);
        }
    } else {
        // If the search bar is empty, clear the results
        searchResultsContainer.innerHTML = '';
    }
}


// Function to add item to cart
function addToCart(productName) {
    // Check if the item is already in the cart
    let item = cart.find(item => item.name === productName);
    if (item) {
      // If already in cart, increase quantity
      item.quantity += 1;
    } else {
      // Otherwise, add new item with quantity 1
      cart.push({ name: productName, quantity: 1 });
    }
    updateCartSection(); 
    showNotification(`${productName} added to cart!`);// Update cart section display
  }
  // Function to show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    
    notificationMessage.textContent = message;  // Set message content
    notification.classList.add('notification-show');  // Show notification

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('notification-show');
    }, 3000);
}

// Toggle Favourite Function
function toggleFavourite(button) {
    const productName = button.previousElementSibling.alt;  // Get product name from the image alt text
    
    if (favorites.includes(productName)) {
        // If it's already in favorites, remove it
        favorites = favorites.filter(item => item !== productName);
    } else {
        // If it's not in favorites, add it
        favorites.push(productName);
    }
    
    updateFavoritesCount();
}

// Function to add/remove item from favorites
function toggleFavourite(button, productName) {
    // Check if item is already in favorites
    let index = favorites.findIndex(item => item.name === productName);
    if (index === -1) {
      // If not in favorites, add it
      favorites.push({ name: productName });
      button.classList.add("favorite-selected"); // Visually mark as favorite
    } else {
      // If in favorites, remove it
      favorites.splice(index, 1);
      button.classList.remove("favorite-selected"); // Remove favorite mark
    }
    updateFavoritesSection(); // Update favorites section display
  }


// Function to update the Cart section display
function updateCartSection() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous items
    cart.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';
      itemDiv.innerHTML = `
        <span>${item.name}</span>
        <span>Quantity: ${item.quantity}</span>
        <button onclick="removeFromCart('${item.name}')">Remove</button>
      `;
      cartItemsContainer.appendChild(itemDiv);
    });
  }
  
  // Function to update the Favorites section display
  function updateFavoritesSection() {
    const favoriteItemsContainer = document.getElementById('favorite-items');
    favoriteItemsContainer.innerHTML = ''; // Clear previous items
    favorites.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'favorite-item';
      itemDiv.innerHTML = `
        <span>${item.name}</span>
        <button onclick="removeFromFavorites('${item.name}')">Remove</button>
      `;
      favoriteItemsContainer.appendChild(itemDiv);
    });
  }
  
  // Function to remove an item from the cart
  function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartSection();
  }
  
  // Function to remove an item from favorites
  function removeFromFavorites(productName) {
    favorites = favorites.filter(item => item.name !== productName);
    updateFavoritesSection();
  }
// Example to update the cart count
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartBtn = document.getElementById('cart-btn');
    cartBtn.innerText = cartCount > 0 ? `Cart (${cartCount})` : 'Cart';
}

// Update the Favourites count in the header button
function updateFavoritesCount() {
    const favoritesCount = favorites.length;
    const favoritesBtn = document.getElementById('favorites-btn');
    favoritesBtn.innerText = favoritesCount > 0 ? `Favourites (${favoritesCount})` : 'Favourites';
}
     

// Modal Functionality (for product details)
const productModal = document.getElementById("product-modal");
const closeModalBtn = document.getElementById("close-btn");
const productName = document.getElementById("product-name");
const productImg = document.getElementById("product-img");
const productDescription = document.getElementById("product-description");

document.querySelectorAll(".category-images img").forEach(img => {
    img.addEventListener("click", (event) => {
        productModal.style.display = "flex";
        productName.innerText = event.target.alt;
        productImg.src = event.target.dataset.src || event.target.src;
        productDescription.innerText = `This is a description for ${event.target.alt}`;
    });
});

closeModalBtn.addEventListener("click", () => {
    productModal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === productModal) {
        productModal.style.display = "none";
    }
});

// Carousel Functionality
document.addEventListener("DOMContentLoaded", function() {
    let currentIndex = 0;
    const slides = document.querySelector('.slides');
    const images = document.querySelectorAll('.carousel-image');
    const totalImages = images.length;

    function showSlide(index) {
        currentIndex = (index + totalImages) % totalImages;
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    setInterval(() => showSlide(currentIndex + 1), 3000);  // Auto-slide every 3 seconds
});

// Lazy Loading Images
document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll(".lazy");

    function lazyLoad() {
        lazyImages.forEach((img) => {
            if (img.getBoundingClientRect().top < window.innerHeight && !img.src) {
                img.src = img.dataset.src;
                img.onload = () => img.classList.add("loaded");
            }
        });
    }

    window.addEventListener("scroll", lazyLoad);
    lazyLoad();
});

 // Placeholder payment processing function
window.processPayment = function() {
    alert('Payment Processed!');
};

// Attach showSection function globally to access from HTML inline onclick
function showSection(sectionId) {
    const sections = ['home', 'categories-section', 'favorites-section', 'cart-section'];
    sections.forEach(id => {
        document.getElementById(id).style.display = id === sectionId ? 'block' : 'none';
    });
}

window.showSection = showSection;
