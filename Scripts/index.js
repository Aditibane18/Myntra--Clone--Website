let bagItems;
let wishlistItems;
onLoad();

function onLoad() {
  let bagItemsStr = localStorage.getItem('bagItems');
  let wishlistItemsStr = localStorage.getItem('wishlistItems');

  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  wishlistItems = wishlistItemsStr ? JSON.parse(wishlistItemsStr) : [];
  displayItemsOnHomePage();
  displayBagIcon();
  displayWishlistIcon();
}
 
function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  displayBagIcon();
}

function toggleWishlist(itemId) {
  const itemIndex = wishlistItems.indexOf(itemId);
  if (itemIndex > -1) {
    wishlistItems.splice(itemIndex, 1);
  } else {
    wishlistItems.push(itemId);
  }
  localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  displayItemsOnHomePage();
  displayWishlistIcon();
  if (typeof displayWishlistItems === 'function') {
    displayWishlistItems();
  }
}

function displayBagIcon() {
  let bagItemCountElement = document.querySelector('.bag-item-count');
  if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = 'visible';
    bagItemCountElement.innerText = bagItems.length;
  } else {
    bagItemCountElement.style.visibility = 'hidden';
  }
}

function displayWishlistIcon() {
  let wishlistItemCountElement = document.querySelector('.wishlist-item-count');
  if (wishlistItems.length > 0) {
    wishlistItemCountElement.style.visibility = 'visible';
    wishlistItemCountElement.textContent = wishlistItems.length;
  } else {
    wishlistItemCountElement.style.visibility = 'hidden';
  }
}

function displayItemsOnHomePage() {
  let itemsContainerElement = document.querySelector('.items-container');
  if (!itemsContainerElement) {
    console.error('Items container element not found');
    return;
  }

  let innerHtml = '';
  items.forEach(item => {
    const isInWishlist = wishlistItems.includes(item.id);
    const wishlistClass = isInWishlist ? 'in-wishlist' : '';
    const wishlistText = isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist';

    innerHtml += `
    <div class="item-container">
      <img class="item-image" src="${item.image}" alt="item image">
      <div class="rating">
          ${item.rating.stars} ⭐ | ${item.rating.count}
      </div>
      <div class="company-name">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price">
          <span class="current-price">Rs ${item.current_price}</span>
          <span class="original-price">Rs ${item.original_price}</span>
          <span class="discount">(${item.discount}% OFF)</span>
      </div>
      <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
      <button class="btn-wishlist ${item.wishlist ? 'in-wishlist' : ''}" onclick="toggleWishlist('${item.id}')">
        ${item.wishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
    </div>`
  });
  itemsContainerElement.innerHTML = innerHtml;
}
document.addEventListener('DOMContentLoaded', function() {
  displayItemsOnHomePage();
});
