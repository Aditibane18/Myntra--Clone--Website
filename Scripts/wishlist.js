function displayWishlistItems() {
    const wishlistItemsStr = localStorage.getItem('wishlistItems');
    const wishlistItemIds = wishlistItemsStr ? JSON.parse(wishlistItemsStr) : [];
  
    const wishlistItems = items.filter(item => wishlistItemIds.includes(item.id));
    let wishlistItemsContainer = document.querySelector('.wishlist-items-container');
    let innerHtml = '';
  
    wishlistItems.forEach(item => {
      innerHtml += `
        <div class="item-container">
          <img class="item-image" src="../${item.image}" alt="${item.item_name}">
          <div class="rating">${item.rating.stars} ⭐ (${item.rating.count} reviews)</div>
          <div class="company-name">${item.company}</div>
          <div class="item-name">${item.item_name}</div>
          <div class="price">
            <span class="current-price">₹${item.current_price}</span>
            <span class="original-price">₹${item.original_price}</span>
            <span class="discount">${item.discount}% OFF</span>
          </div>
          <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
          <button class="btn-wishlist in-wishlist" onclick="toggleWishlist(${item.id})">Remove from Wishlist</button>
        </div>`;
    });
  
    wishlistItemsContainer.innerHTML = innerHtml;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    displayWishlistItems();
  });
  
