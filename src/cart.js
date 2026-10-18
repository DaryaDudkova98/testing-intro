//function notImplemented() {
//  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
//}

function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Quantity must be positive');
  }

  if (quantity > product.stock) {
    throw new RangeError('Not enough stock');
  }

  const existingIndex = cart.findIndex(item => item.id === product.id);

  if (existingIndex === -1) {
    return [...cart, { ...product, quantity }];
  }

  const updated = {
    ...cart[existingIndex],
    quantity: cart[existingIndex].quantity + quantity,
  };

  return [
    ...cart.slice(0, existingIndex),
    updated,
    ...cart.slice(existingIndex + 1),
  ];
}

function changeQuantity(cart, id, newQuantity) {
  const item = cart.find((item) => item.id === id);
  if (!item) {
    return cart;
  }
  if (newQuantity < 1) {
    throw new RangeError('Quantity must be positive');
  }
  if (newQuantity > item.stock) {
    throw new RangeError('Not enough stock');
  }

  const index = cart.findIndex((item) => item.id === id);
  const updated = { ...cart[index], quantity: newQuantity };

  return [
    ...cart.slice(0, index),
    updated,
    ...cart.slice(index + 1),
  ];
}

function removeFromCart(cart, id) {
  return cart.filter((item) => item.id !== id);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promo) {
  const subtotal = calculateCartSubtotal(cart);

  const discount =
    promo === 'SAVE10' && subtotal >= 20000
      ? Math.round(subtotal * 0.1)
      : 0;

  const delivery = subtotal < 50000 ? 30000 : 0;

  const total = subtotal - discount + delivery;

  return { subtotal, discount, delivery, total };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
