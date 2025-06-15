
const btnCart = document.getElementById('btn-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  cartCount.textContent = cart.length;
  cartItems.innerHTML = '';
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-gray-500">Seu carrinho está vazio.</p>';
    return;
  }
  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList = 'flex justify-between items-center border-b pb-4';
    div.innerHTML = \`
      <div>
        <h4 class="text-md font-semibold text-pink-700">\${item.name}</h4>
        <p class="text-sm text-gray-600">R$ \${item.price.toFixed(2)}</p>
      </div>
      <button onclick="removeFromCart(\${index})" class="text-red-500 hover:text-red-700">Remover</button>
    \`;
    cartItems.appendChild(div);
  });
}

function addToCart(e) {
  const btn = e.currentTarget;
  const name = btn.dataset.name;
  const price = parseFloat(btn.dataset.price);
  cart.push({ name, price });
  saveCart();
  btn.textContent = 'Adicionado!';
  setTimeout(() => { btn.textContent = 'Adicionar ao Carrinho'; }, 1500);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
}

function finalizarCompra() {
  alert('Compra finalizada com sucesso!');
  cart = [];
  saveCart();
}

btnCart.addEventListener('click', () => cartSidebar.classList.remove('translate-x-full'));
closeCart.addEventListener('click', () => cartSidebar.classList.add('translate-x-full'));

updateCartUI();
