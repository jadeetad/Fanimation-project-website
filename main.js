document.addEventListener("DOMContentLoaded", function () {
    // Initial cart count
    let cartCount = 0;

    // Get the button and cart count element
    const addButton = document.querySelector(".button");
    const cartCountElement = document.getElementById("cart-count");

    // Add event listener to the "Add to Cart" button
    if (addButton && cartCountElement) {
        addButton.addEventListener("click", function () {
            cartCount++; // Increment the cart count
            cartCountElement.textContent = cartCount; // Update displayed cart count
        });
    }

    // Handle image interactions
    const images = document.querySelectorAll(".row img");

    images.forEach((img, index) => {
        let stockStatus = Math.random() > 0.5 ? "In Stock" : "Out of Stock";

        let infoDiv = document.createElement("div");
        infoDiv.classList.add("product-info");
        infoDiv.innerHTML = `<p>Fan Model ${index + 1}</p><p>${stockStatus}</p>`;

        let fanContainer = img.closest(".fan-container");
        if (fanContainer) {
            fanContainer.appendChild(infoDiv);
        }

        // Hover effects
        fanContainer.addEventListener("mouseenter", function () {
            infoDiv.style.opacity = "1";
        });

        fanContainer.addEventListener("mouseleave", function () {
            infoDiv.style.opacity = "0";
        });

        // Click event to go to product page
        img.parentElement.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = `product${index + 1}.html`;
        });
    });

    // Cart popup function
    function showCartPopup() {
        const popup = document.getElementById('cart-popup');
        popup.style.display = 'block';
        popup.style.opacity = '1';

        setTimeout(() => {
            popup.style.opacity = '0';
            setTimeout(() => {
                popup.style.display = 'none';
            }, 500);
        }, 2000);
    }

    // Add event listeners to "Add to Cart" buttons
    const cartButtons = document.querySelectorAll('.add-to-cart');
    cartButtons.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            event.stopPropagation();
            const productName = btn.getAttribute('data-name');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(productName);
            localStorage.setItem('cart', JSON.stringify(cart));
            showCartPopup();
        });
    });

    // Display cart items on cart page
    const cartContainer = document.querySelector('.cart-items');
    if (cartContainer) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContainer.innerHTML = cart.length
            ? cart.map(item => `<div class="cart-item">${item}</div>`).join('')
            : "<p>Your cart is empty. 🛒</p>";
    }

    // Update Ticker
    function updateTicker() {
        const ticker = document.getElementById("tickerText");

        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
                    .then(response => response.json())
                    .then(data => {
                        const location = data.address.city || data.address.state || "Unknown Location";
                        ticker.innerHTML = `📅 ${date} ⏰ ${time} 📍 ${location} → → → `;
                    })
                    .catch(() => {
                        ticker.innerHTML = `📅 ${date} ⏰ ${time} 📍 Location Unavailable → → → `;
                    });
            });
        } else {
            ticker.innerHTML = `📅 ${date} ⏰ ${time} 📍 Location Unavailable → → → `;
        }
    }

    setInterval(updateTicker, 1000);
    updateTicker();

    // Carousel Scroll
    const carousel = document.getElementById('carousel');
    if (carousel) {
        carousel.addEventListener('wheel', (event) => {
            event.preventDefault();
            carousel.scrollLeft += event.deltaY;
        });
    }

    // Function to shuffle images when a filter is clicked
    function shuffleGallery() {
        const galleryTrack = document.querySelector(".gallery-track");
        if (!galleryTrack) return;

        let fanContainers = Array.from(galleryTrack.querySelectorAll(".fan-container"));

        // Fisher-Yates Shuffle Algorithm
        for (let i = fanContainers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [fanContainers[i], fanContainers[j]] = [fanContainers[j], fanContainers[i]];
        }

        // Clear gallery and re-append shuffled items
        galleryTrack.innerHTML = "";
        fanContainers.forEach(fan => galleryTrack.appendChild(fan));
    }

    // Attach shuffle function to filter buttons
    document.querySelectorAll(".filter-item").forEach(button => {
        button.addEventListener("click", shuffleGallery);
    });

    // Cart Banner Function
    function showCartBanner() {
        const banner = document.getElementById("cart-banner");
        if (!banner) return;

        banner.style.display = "block";
        banner.style.opacity = "1";

        setTimeout(() => {
            banner.style.opacity = "0";
            setTimeout(() => {
                banner.style.display = "none";
            }, 500);
        }, 2000);
    }
});
