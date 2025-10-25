/**
 * Cart Management System
 * Handles all cart operations with localStorage persistence
 */

const CART_KEY = "shopping_cart";

/**
 * Get cart from localStorage
 */
export const getCart = () => {
  if (typeof window === "undefined") return [];

  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error reading cart:", error);
    return [];
  }
};

/**
 * Save cart to localStorage
 */
const saveCart = (cart) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
};

/**
 * Add item to cart
 */
export const addToCart = (product, quantity = 1) => {
  const cart = getCart();

  // Check if product already exists in cart
  const existingItemIndex = cart.findIndex((item) => item._id === product._id);

  if (existingItemIndex > -1) {
    // Update quantity if product exists
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new product to cart
    cart.push({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
      quantity: quantity,
    });
  }

  saveCart(cart);
  return cart;
};

/**
 * Remove item from cart
 */
export const removeFromCart = (productId) => {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item._id !== productId);
  saveCart(updatedCart);
  return updatedCart;
};

/**
 * Update item quantity
 */
export const updateCartItemQuantity = (productId, quantity) => {
  const cart = getCart();
  const itemIndex = cart.findIndex((item) => item._id === productId);

  if (itemIndex > -1) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }

    // Don't exceed stock
    const maxQuantity = Math.min(quantity, cart[itemIndex].stock);
    cart[itemIndex].quantity = maxQuantity;
    saveCart(cart);
  }

  return cart;
};

/**
 * Get cart total
 */
export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

/**
 * Get cart item count
 */
export const getCartItemCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

/**
 * Clear entire cart
 */
export const clearCart = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_KEY);
};

/**
 * Check if product is in cart
 */
export const isInCart = (productId) => {
  const cart = getCart();
  return cart.some((item) => item._id === productId);
};

/**
 * Get item quantity in cart
 */
export const getItemQuantity = (productId) => {
  const cart = getCart();
  const item = cart.find((item) => item._id === productId);
  return item ? item.quantity : 0;
};
