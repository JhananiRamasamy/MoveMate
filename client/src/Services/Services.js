// src/services/apiService.js

const API_BASE_URL = 'http://localhost:3000/api'
const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers, // Allow overriding headers
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
  }

  return response.json();
};

// Common API functions
const apiService = {
  get: (endpoint) => apiFetch(endpoint, { method: 'GET' }),
  post: (endpoint, body) => apiFetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  }),
  put: (endpoint, body) => apiFetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
  }),
  delete: (endpoint) => apiFetch(endpoint, { method: 'DELETE' }),
};

export default apiService;
