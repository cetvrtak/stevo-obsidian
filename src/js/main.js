import './carousel.js';

// CART
const buyEl = document.querySelector('.cart-option-buy');
const priceSpan = document.querySelector('#cart-price');
const discountEl = document.querySelector('.cart-option-subscribe');
const discountSpan = document.querySelector('#cart-discount');
const discountedPriceSpan = document.querySelector('#cart-discounted-price');

const decreaseBtn = document.querySelector('.cart-quantity-decrease');
const increaseBtn = document.querySelector('.cart-quantity-increase');
const quantityDisplay = document.querySelector('.cart-quantity');

const price = buyEl.dataset.price;
const discount = discountEl.dataset.discount;
const discountedPrice = Math.round(price * (1 - discount / 100));
let quantity = parseInt(quantityDisplay.textContent, 10);

// RENDER PRICES & DISCOUNT
function renderPrices() {
  priceSpan && (priceSpan.textContent = quantity * price);
  discountSpan && (discountSpan.textContent = discount);
  discountedPriceSpan &&
    (discountedPriceSpan.textContent = quantity * discountedPrice);
}

renderPrices();

// HANDLE OPTION SELECTION
let discountApplied = false;
const cartOptions = document.querySelectorAll('.cart-option');

cartOptions.forEach((option) => {
  option.addEventListener('click', selectOption);
});

function selectOption() {
  cartOptions.forEach((opt) => opt.classList.remove('cart-option-selected'));
  this.classList.add('cart-option-selected');

  discountApplied = this.hasAttribute('data-discount');
}

// HANDLE QUANTITY CHANGE
decreaseBtn.addEventListener('click', () => {
  if (quantity > 1) {
    quantity--;
    updateQuantity();
  }
});

increaseBtn.addEventListener('click', () => {
  quantity++;
  updateQuantity();
});

function updateQuantity() {
  quantityDisplay.textContent = quantity;
  renderPrices();
}

// HANDLE ADD TO CART
const addToCartBtn = document.querySelector('.cart-add-button');

function addToCart() {
  const finalPrice = discountApplied ? discountedPrice : price;

  const cartItem = {
    quantity,
    price: quantity * finalPrice,
  };

  localStorage.setItem('obsidianCart', JSON.stringify(cartItem));
  animate();
}

function animate() {
  const addToCartText = document.querySelector('.cart-add-button-text');
  const addToCartAnimation = document.querySelector(
    '.cart-add-button-animation'
  );

  addToCartText.classList.add('hidden');
  addToCartAnimation.classList.remove('hidden');
}

addToCartBtn.addEventListener('click', addToCart);

// SPECS
$(document).ready(function () {
  $('.spec-header').on('click', function () {
    let spec = $(this).closest('.spec');
    let specDesc = spec.find('.spec-desc');
    let icon = spec.find('.spec-header-icon');

    // Close all other specs
    $('.spec-desc').not(specDesc).slideUp();
    $('.spec-header-icon').not(icon).text('+');

    // Toggle current spec
    if (!specDesc.is(':visible')) {
      specDesc.slideDown();
      icon.text('-');
    }
  });
});
