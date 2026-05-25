import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Configure axios to include token if it exists
const api = axios.create({
  baseURL: API_URL,
  timeout: 1000 // Fast timeout so mock fallback kicks in instantly
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const ProductService = {
  getAllProducts: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error("Error fetching products from backend, falling back to dummy data", error);
      // We import dummyData dynamically here as a fallback just so the UI doesn't crash 
      // if the backend isn't running yet.
      const { dummyProducts } = await import('./dummyData.js');
      return dummyProducts;
    }
  },
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },
  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  }
};

export const AuthService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      // MOCK FALLBACK FOR TESTING WITHOUT BACKEND
      console.warn("Backend login failed, using mock login for testing.");
      
      // Check if they registered a mock user previously
      const mockUsersStr = localStorage.getItem('mockUsers');
      let mockUsers = mockUsersStr ? JSON.parse(mockUsersStr) : [];
      let foundUser = mockUsers.find(u => u.email === email);
      
      let mockUser;
      if (foundUser) {
        mockUser = foundUser; // Use the one they registered
      } else if (email === 'admin@klevis.lk') {
        mockUser = { id: '999', firstName: 'Admin', lastName: 'User', email: email, role: 'ROLE_ADMIN' };
      } else {
        mockUser = { id: '888', firstName: 'Test', lastName: 'User', email: email, role: 'ROLE_USER' };
      }
      
      localStorage.setItem('token', 'mock-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      return { token: 'mock-token', user: mockUser };
    }
  },
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.warn("Backend register failed, using mock register for testing.");
      
      // Store the mocked user in localStorage so we can log them in next
      const mockUsersStr = localStorage.getItem('mockUsers');
      let mockUsers = mockUsersStr ? JSON.parse(mockUsersStr) : [];
      
      const newMockUser = {
        id: Math.random().toString(36).substr(2, 9),
        ...userData
      };
      
      mockUsers.push(newMockUser);
      localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
      
      return newMockUser;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  getAllUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.warn("Backend user fetch failed, using mock users.");
      const mockUsersStr = localStorage.getItem('mockUsers');
      return mockUsersStr ? JSON.parse(mockUsersStr) : [];
    }
  },

  deleteUser: async (id) => {
    try {
      await api.delete(`/users/${id}`);
    } catch (error) {
      console.warn("Backend user delete failed, using mock delete.");
      const mockUsersStr = localStorage.getItem('mockUsers');
      if (mockUsersStr) {
        let mockUsers = JSON.parse(mockUsersStr);
        mockUsers = mockUsers.filter(user => user.id !== id);
        localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
      }
    }
  }
};

export default api;
