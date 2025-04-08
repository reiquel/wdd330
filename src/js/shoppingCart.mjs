import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function ShoppingCart() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems != null) {
    const outputEl = document.querySelector(".product-list");
    renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
    displayTotal(cartItems);
  } else {
    console.log("No Products on the Cart");
  }
}

function cartItemTemplate(item) {
  console.log(item);
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function displayTotal(cartItems) {
  /*
  * Function used to display the total on the cart page.
  * Parameters:
  *   cartItem: Any
  */
  let total = calculateTotal(cartItems);
  document.querySelector(".cart-total").textContent = `Total: $${total}`;
  document.querySelector(".cart-footer").setAttribute('style', 'display: block');
}

function calculateTotal(products) {
  /*
  * Function used to calculate the total of a group of products.
  * Parameters:
  *   products: [object]
  */
  let total = 0.00;
  products.map (product => total += parseFloat(product.FinalPrice));
  return total;
}