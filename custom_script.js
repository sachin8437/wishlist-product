 // Assets > custom_script.js
 

function toggleWishlist(productId, productTitle, productPrice, productImage) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

        const productIndex = wishlist.findIndex(product => product.id === productId);

        if (productIndex > -1) {
            wishlist.splice(productIndex, 1);  // Remove product from wishlist
            alert("Product removed from wishlist");
          jQuery('.wishlist_button').removeClass('whislist_active');
        } else {
            wishlist.push({ id: productId, title: productTitle, price: productPrice, image: productImage });  // Add product to wishlist
            alert("Product added to wishlist");
          
          jQuery('.wishlist_button').addClass('whislist_active');
        }

        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }



// jQuery document ready function
jQuery(document).ready(function() {
  // Event listener for the wishlist button
  jQuery(document).on('click', '.wishlist_button', function() {
    var productId = $(this).attr('data-product-id');
    var productTitle = $(this).attr('data-product-title');
    var productPrice = $(this).attr('data-product-price');
    var productImage = $(this).attr('data-product-image');

    toggleWishlist(productId, productTitle, productPrice, productImage);
     
  });

  // Event listener for removing a product from the wishlist
  jQuery(document).on('click', '.remove-from-wishlist', function() {
    const productId = jQuery(this).data('product-id');
    removeFromWishlist(productId);
  });

  
});


jQuery(document).ready(function($) {
    
var currentPageUrl = window.location.origin; 
  
    function displayWishlist() {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const wishlistContainer = $('#wishlistItems');

        wishlistContainer.empty();

        if (wishlist.length === 0) {
            wishlistContainer.html('<p>Your wishlist is empty.</p>');
            return;
        }

        wishlist.forEach(function(product) {
            wishlistContainer.append(`
                <div class="wishlist-product">
                    <img src="${currentPageUrl}/cdn/shop/${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>${product.price}</p>
                    <button class="remove-wishlist" data-product-id="${product.id}">Remove</button>
                </div>
            `);
        });

        // Add event listener to remove button
        $('.remove-wishlist').click(function() {
            const productId = $(this).attr('data-product-id');
            removeFromWishlist(productId);
        });
    }

    function removeFromWishlist(productId) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlist = wishlist.filter(product => product.id !== productId);

        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        displayWishlist(); // Update the display
    }

  displayWishlist();
});
