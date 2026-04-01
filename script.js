const WHATSAPP_NUMBER = '250788293009'; // Replace with your business WhatsApp number.
const CURRENCY = 'Frw';

const products = [
  { id: 1, name: 'Gold Standard Whey', category: 'whey', size: '2.3kg', price: 195000, image: 'assets/whey_1.png' },
  { id: 2, name: 'NitroTech Whey', category: 'whey', size: '1.8kg', price: 175000, image: 'assets/whey_2.png' },
  { id: 3, name: 'Gibbons The Whey', category: 'whey', size: '2.7kg', price: 185000, image: 'assets/whey_3.png' },
  { id: 4, name: 'ISO 100', category: 'whey', size: '2.7kg', price: 210000, image: 'assets/whey_4.png' },
  { id: 5, name: 'Iso Surge', category: 'whey', size: '2.3kg', price: 195000, image: 'assets/whey_5.png' },
  { id: 6, name: 'Mutant Whey', category: 'whey', size: '1.8kg', price: 165000, image: 'assets/whey_6.png' },
  { id: 7, name: 'Critical Whey', category: 'whey', size: '2.3kg', price: 195000, image: 'assets/whey_7.png' },
  { id: 8, name: 'Critical Plant Whey', category: 'whey', size: '2.3kg', price: 195000, image: 'assets/whey_8.png' },
  { id: 9, name: 'BasiX Whey', category: 'whey', size: '2.3kg', price: 185000, image: 'assets/whey_9.png' },

  { id: 10, name: 'Serious Mass', category: 'mass', size: '2.7kg', price: 140000, image: 'assets/mass_1.png' },
  { id: 11, name: 'Mass Tech Extreme', category: 'mass', size: '2.7kg', price: 145000, image: 'assets/mass_2.png' },
  { id: 12, name: 'Mass Gainer Pro', category: 'mass', size: '3kg', price: 250000, image: 'assets/mass_3.png' },
  { id: 13, name: 'MuscleTech Mass Tech', category: 'mass', size: '3kg', price: 155000, image: 'assets/mass_4.png' },
  { id: 14, name: 'Mutant Mass Gainer', category: 'mass', size: '2.3kg', price: 135000, image: 'assets/mass_5.png' },
  { id: 15, name: 'The Mass Gainer', category: 'mass', size: '3kg', price: 195000, image: 'assets/mass_6.png' },

  { id: 16, name: '100% Whey Protein', category: 'vitamins', size: '2.3kg', price: 195000, image: 'assets/vit_1.png' },
  { id: 17, name: 'Gold Standard Protein', category: 'vitamins', size: '2.3kg', price: 195000, image: 'assets/vit_2.png' },
  { id: 18, name: 'Premium Whey', category: 'vitamins', size: '2.3kg', price: 195000, image: 'assets/vit_3.png' },
  { id: 19, name: 'ON Whey Black', category: 'vitamins', size: '2.3kg', price: 195000, image: 'assets/vit_4.png' },
  { id: 20, name: 'Performance Whey', category: 'vitamins', size: '2.3kg', price: 195000, image: 'assets/vit_5.png' },
  { id: 21, name: 'ON Whey Classic', category: 'vitamins', size: '2.3kg', price: 195000, image: 'assets/vit_6.png' },
  { id: 22, name: 'Advanced Whey', category: 'vitamins', size: '2.3kg', price: 195000, image: 'assets/vit_7.png' },
  { id: 23, name: 'Lean Whey', category: 'vitamins', size: '2.3kg', price: 195000, image: 'assets/vit_8.png' },
  { id: 24, name: 'Pure Whey', category: 'vitamins', size: '2.3kg', price: 195000, image: 'assets/vit_9.png' },
  { id: 25, name: 'Whey Focus', category: 'vitamins', size: '2.3kg', price: 195000, image: 'assets/vit_10.png' },
  { id: 26, name: 'Whey Balance', category: 'vitamins', size: '2.3kg', price: 195000, image: 'assets/vit_11.png' },
  { id: 27, name: 'Whey Power', category: 'vitamins', size: '2.3kg', price: 195000, image: 'assets/vit_12.png' },

  { id: 28, name: 'Platinum Creatine', category: 'creatine', size: '400g', price: 80000, image: 'assets/vit_12.png' },
  { id: 29, name: 'Acetyl L-Carnitine', category: 'preworkout', size: '250g', price: 65000, image: 'assets/hero-products.png' },
  { id: 30, name: 'BCAA 7g Blue', category: 'recovery', size: '30 servings', price: 65000, image: 'assets/whey_8.png' },
  { id: 31, name: 'BCAA 7g Pink', category: 'recovery', size: '30 servings', price: 65000, image: 'assets/whey_7.png' }
];

let state = {
  search: '',
  category: 'all',
  sort: 'default',
  cart: JSON.parse(localStorage.getItem('kps-cart') || '[]')
};

const productGrid = document.getElementById('productGrid');
const cartItems = document.getElementById('cartItems');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartCount = document.getElementById('cartCount');
const cartDrawer = document.getElementById('cartDrawer');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const toast = document.getElementById('toast');

function formatPrice(value) {
  return `${value.toLocaleString()} ${CURRENCY}`;
}

function saveCart() {
  localStorage.setItem('kps-cart', JSON.stringify(state.cart));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

function getFilteredProducts() {
  const search = state.search.trim().toLowerCase();
  let filtered = [...products];

  if (state.category !== 'all') {
    filtered = filtered.filter(product => product.category === state.category);
  }

  if (search) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.size.toLowerCase().includes(search)
    );
  }

  switch (state.sort) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }

  return filtered;
}

function renderProducts() {
  const filtered = getFilteredProducts();

  if (!filtered.length) {
    productGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        No products match your search or filter.
      </div>
    `;
    return;
  }

  productGrid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-media">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="product-body">
        <span class="product-category">${product.category.replace(/\b\w/g, ch => ch.toUpperCase())}</span>
        <h3 class="product-title">${product.name}</h3>
        <div class="product-meta">
          <span class="product-price">${formatPrice(product.price)}</span>
          <span class="product-size">${product.size}</span>
        </div>
        <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to cart</button>
      </div>
    </article>
  `).join('');
}

function addToCart(productId) {
  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    const product = products.find(item => item.id === productId);
    state.cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  renderCart();
  showToast('Product added to cart');
}
window.addToCart = addToCart;

function updateQuantity(productId, change) {
  const item = state.cart.find(product => product.id === productId);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(product => product.id !== productId);
  }
  saveCart();
  renderCart();
}
window.updateQuantity = updateQuantity;

function removeFromCart(productId) {
  state.cart = state.cart.filter(product => product.id !== productId);
  saveCart();
  renderCart();
}
window.removeFromCart = removeFromCart;

function renderCart() {
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  cartCount.textContent = totalItems;
  cartSubtotal.textContent = formatPrice(subtotal);

  if (!state.cart.length) {
    cartItems.innerHTML = `
      <div class="empty-state">
        Your cart is empty. Add products to prepare a WhatsApp order.
      </div>
    `;
    return;
  }

  cartItems.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <h4>${item.name}</h4>
        <p>${item.size} · ${formatPrice(item.price)}</p>
        <div class="qty-wrap">
          <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
          <strong>${item.quantity}</strong>
          <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
        </div>
      </div>
      <div style="text-align:right;">
        <strong>${formatPrice(item.price * item.quantity)}</strong>
        <div style="margin-top:8px;">
          <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
}

function openCart() {
  cartDrawer.classList.add('open');
  cartDrawer.setAttribute('aria-hidden', 'false');
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartDrawer.setAttribute('aria-hidden', 'true');
}

function checkoutWhatsApp() {
  if (!state.cart.length) {
    showToast('Add at least one product before checkout');
    return;
  }

  const lines = state.cart.map((item, index) => {
    const lineTotal = item.price * item.quantity;
    return `${index + 1}. ${item.name} (${item.size}) x ${item.quantity} = ${formatPrice(lineTotal)}`;
  });

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const message = [
    'Hello Kigali Protein Store,',
    '',
    'I would like to place this order:',
    ...lines,
    '',
    `Subtotal: ${formatPrice(subtotal)}`,
    'Please confirm availability and delivery details.'
  ].join('\n');

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

searchInput.addEventListener('input', (event) => {
  state.search = event.target.value;
  renderProducts();
});

categoryFilter.addEventListener('change', (event) => {
  state.category = event.target.value;
  syncPills();
  renderProducts();
});

sortFilter.addEventListener('change', (event) => {
  state.sort = event.target.value;
  renderProducts();
});

document.querySelectorAll('.pill').forEach(button => {
  button.addEventListener('click', () => {
    state.category = button.dataset.category;
    categoryFilter.value = state.category;
    syncPills();
    renderProducts();
  });
});

function syncPills() {
  document.querySelectorAll('.pill').forEach(button => {
    button.classList.toggle('active', button.dataset.category === state.category);
  });
}

document.getElementById('openCartBtn').addEventListener('click', openCart);
document.getElementById('closeCartBtn').addEventListener('click', closeCart);
document.getElementById('checkoutBtn').addEventListener('click', checkoutWhatsApp);
document.getElementById('clearCartBtn').addEventListener('click', () => {
  state.cart = [];
  saveCart();
  renderCart();
  showToast('Cart cleared');
});
document.getElementById('heroWhatsappBtn').addEventListener('click', openCart);
document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('mainNav').classList.toggle('open');
});

cartDrawer.addEventListener('click', (event) => {
  if (event.target === cartDrawer) closeCart();
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('mainNav').classList.remove('open');
  });
});

window.addEventListener('scroll', () => {
  const links = document.querySelectorAll('.nav-link');
  const sections = ['home', 'store', 'about', 'contact'];
  const current = sections.findLast(id => {
    const section = document.getElementById(id);
    return section.getBoundingClientRect().top <= 140;
  }) || 'home';

  links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
});

renderProducts();
renderCart();
