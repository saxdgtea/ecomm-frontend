/**
 * API Utility Functions
 * Centralized fetch logic with token handling
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Get auth token from localStorage
 * @returns {string|null} - JWT token or null
 */
export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

/**
 * Set auth token in localStorage
 * @param {string} token - JWT token
 */
export const setToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

/**
 * Remove auth token from localStorage
 */
export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

/**
 * Get user data from localStorage
 * @returns {object|null} - User object or null
 */
export const getUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

/**
 * Set user data in localStorage
 * @param {object} user - User object
 */
export const setUser = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

/**
 * Remove user data from localStorage
 */
export const removeUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
};

/**
 * Make API request with automatic token handling
 * @param {string} endpoint - API endpoint (e.g., '/products')
 * @param {object} options - Fetch options
 * @returns {Promise} - Response data
 */
export const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  // Add authorization header if token exists
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  // Remove Content-Type if uploading files
  if (options.body instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Auth API calls
 */
export const authAPI = {
  login: (credentials) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  register: (userData) =>
    apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  getMe: () => apiRequest("/auth/me"),
};

/**
 * Products API calls
 */
export const productsAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/products${query ? `?${query}` : ""}`);
  },

  getById: (id) => apiRequest(`/products/${id}`),

  create: (formData) =>
    apiRequest("/products", {
      method: "POST",
      body: formData,
    }),

  update: (id, formData) =>
    apiRequest(`/products/${id}`, {
      method: "PUT",
      body: formData,
    }),

  delete: (id) =>
    apiRequest(`/products/${id}`, {
      method: "DELETE",
    }),
};

/**
 * Categories API calls
 */
export const categoriesAPI = {
  getAll: () => apiRequest("/categories"),

  getById: (id) => apiRequest(`/categories/${id}`),

  create: (data) =>
    apiRequest("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiRequest(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiRequest(`/categories/${id}`, {
      method: "DELETE",
    }),
};

/**
 * Orders API calls
 */
export const ordersAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/orders${query ? `?${query}` : ""}`);
  },

  getById: (id) => apiRequest(`/orders/${id}`),

  create: (data) =>
    apiRequest("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateStatus: (id, status) =>
    apiRequest(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),

  getMyOrders: () => apiRequest("/orders/my-orders"),
};
