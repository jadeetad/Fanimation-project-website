document.addEventListener("DOMContentLoaded", function() {
  // Initial cart count
  let cartCount = 0;
  
  // Get the button and cart count element
  const addButton = document.querySelector(".button");
  const cartCountElement = document.getElementById("cart-count");

  // Add event listener to the "Add to Cart" button
  if (addButton && cartCountElement) {
      addButton.addEventListener("click", function() {
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

      // Append infoDiv to the closest .fan-container, not just the parent
      let fanContainer = img.closest(".fan-container");
      if (fanContainer) {
          fanContainer.appendChild(infoDiv);
      }

      // Hover effects
      fanContainer.addEventListener("mouseenter", function() {
          infoDiv.style.opacity = "1";
      });

      fanContainer.addEventListener("mouseleave", function() {
          infoDiv.style.opacity = "0";
      });

      // Click event to go to product page
      img.parentElement.addEventListener("click", function(event) {
          event.preventDefault(); // Prevent conflicts with <a> tag
          window.location.href = `product${index + 1}.html`;
      });
  });
});

function showCartPopup() {
  const popup = document.getElementById('cart-popup');
  popup.style.display = 'block';
  popup.style.opacity = '1';

  setTimeout(() => {
      popup.style.opacity = '0';
      setTimeout(() => {
          popup.style.display = 'none';
      }, 500); // Wait for fade-out before hiding
  }, 2000); // Keep it visible for 2 seconds
}

// Add event listeners to "Add to Cart" buttons
const cartButtons = document.querySelectorAll('.add-to-cart');
cartButtons.forEach((btn) => {
  btn.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevents redirect
      const productName = btn.getAttribute('data-name'); // Assume product name is stored in a data attribute
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(productName);
      localStorage.setItem('cart', JSON.stringify(cart));
      showCartPopup();
  });
});

// Display cart items on cart page
document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.querySelector('.cart-items');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty. 🛒</p>";
  } else {
      cartContainer.innerHTML = cart.map(item => `<div class="cart-item">${item}</div>`).join('');
  }
});

// Update Ticker
function updateTicker() {
  const ticker = document.getElementById("tickerText");

  // Get current date & time
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  // Get user location
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Use a reverse geolocation API like OpenStreetMap (optional)
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

// Update ticker every second
setInterval(updateTicker, 1000);

// Initialize ticker on page load
updateTicker();

const carousel = document.getElementById('carousel');
carousel.addEventListener('wheel', (event) => {
    event.preventDefault();
    carousel.scrollLeft += event.deltaY;
});
document.querySelectorAll(".filter-item").forEach(button => {
  button.addEventListener("click", () => {
      let gallery = document.querySelector(".gallery");
      let items = Array.from(gallery.children);
  }
      document.addEventListener("DOMContentLoaded", function () {
        const galleryTrack = document.querySelector(".gallery-track");
        const filterButtons = document.querySelectorAll(".filter-item");
    
        console.log("Filter buttons found:", filterButtons.length);
    
        function shuffleGallery() {
            console.log("Shuffling gallery...");
    
            const fanRows = Array.from(document.querySelectorAll(".row")); // Select fresh rows
            let shuffledFans = [];
    
            fanRows.forEach(row => {
                let fans = Array.from(row.children); // Get all fan containers in a row
                console.log("Fans before shuffle:", fans.map(fan => fan.querySelector(".product-info").textContent));
    
                for (let i = fans.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [fans[i], fans[j]] = [fans[j], fans[i]];
                }
    
                console.log("Fans after shuffle:", fans.map(fan => fan.querySelector(".product-info").textContent));
                shuffledFans.push(...fans);
            });
    
            galleryTrack.innerHTML = "";
            while (shuffledFans.length) {
                let newRow = document.createElement("div");
                newRow.classList.add("row");
                newRow.append(...shuffledFans.splice(0, 3)); // Keep 3 per row
                galleryTrack.appendChild(newRow);
            }
    
            console.log("Gallery shuffled!");
        }
    
        filterButtons.forEach(button => {
            button.addEventListener("click", shuffleGallery);
        });
    })
      function showCartBanner() {
    const banner = document.getElementById("cart-banner");
    banner.style.display = "block";
    banner.style.opacity = "1";

    setTimeout(() => {
        banner.style.opacity = "0";
        setTimeout(() => {
            banner.style.display = "none";
        }, 500); // Wait for fade-out
    }, 2000); // Show for 2 seconds
}
