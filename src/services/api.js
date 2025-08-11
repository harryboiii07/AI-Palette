// API service layer for handling backend calls
// This will replace static data with actual API calls in the future

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Utility function for making HTTP requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Dashboard API calls
export const dashboardAPI = {
  getMetrics: async () => {
    // TODO: Replace with actual API call
    return {
      totalProducts: 247,
      successRate: 87,
      activeUsers: 1432,
      trendingCategories: 5,
      growthMetrics: {
        productsGrowth: 12,
        successRateGrowth: 3,
        usersGrowth: 8
      }
    };
  },

  getTrends: async () => {
    // TODO: Replace with actual API call
    return [
      { month: 'Jan', beverages: 65, snacks: 45, dairy: 30 },
      { month: 'Feb', beverages: 70, snacks: 50, dairy: 35 },
      { month: 'Mar', beverages: 75, snacks: 55, dairy: 40 },
      { month: 'Apr', beverages: 80, snacks: 60, dairy: 45 }
    ];
  }
};

// Products API calls
export const productsAPI = {
  getProducts: async (filters = {}) => {
    // TODO: Replace with actual API call that handles filtering
    const { search, category } = filters;
    
    const products = [
      { id: 1, name: 'Spiced Turmeric Latte', category: 'Beverages', score: 92, status: 'Active', created: '2024-08-01' },
      { id: 2, name: 'Coconut Quinoa Bites', category: 'Snacks', score: 87, status: 'Testing', created: '2024-07-28' },
      { id: 3, name: 'Green Tea Yogurt', category: 'Dairy', score: 94, status: 'Active', created: '2024-07-25' },
      { id: 4, name: 'Mango Chili Chips', category: 'Snacks', score: 89, status: 'Active', created: '2024-07-20' },
      { id: 5, name: 'Oat Milk Matcha', category: 'Beverages', score: 91, status: 'Active', created: '2024-07-15' },
      { id: 6, name: 'Protein Chickpea Pasta', category: 'Cereals', score: 85, status: 'Testing', created: '2024-07-10' },
      { id: 7, name: 'Hibiscus Ginger Tea', category: 'Beverages', score: 88, status: 'Active', created: '2024-07-05' },
      { id: 8, name: 'Dark Chocolate Quinoa', category: 'Confectionery', score: 93, status: 'Active', created: '2024-06-30' }
    ];

    // Apply client-side filtering (will be moved to backend)
    return products.filter(product => {
      const matchesSearch = !search || product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !category || product.category === category;
      return matchesSearch && matchesCategory;
    });
  },

  createProduct: async (productData) => {
    // TODO: Implement actual API call
    return apiRequest('/api/products', {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  },

  updateProduct: async (productId, productData) => {
    // TODO: Implement actual API call
    return apiRequest(`/api/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    });
  },

  deleteProduct: async (productId) => {
    // TODO: Implement actual API call
    return apiRequest(`/api/products/${productId}`, {
      method: 'DELETE'
    });
  }
};

// Market Intelligence API calls
export const marketAPI = {
  getTrendingIngredients: async () => {
    // TODO: Replace with actual API call
    return [
      { name: 'Turmeric', score: 85, growth: '+12%' },
      { name: 'Green Tea', score: 78, growth: '+8%' },
      { name: 'Coconut', score: 72, growth: '+15%' },
      { name: 'Quinoa', score: 68, growth: '+6%' }
    ];
  },

  getRegionalData: async () => {
    // TODO: Replace with actual API call
    return [
      { region: 'North America', percentage: 35 },
      { region: 'Europe', percentage: 28 },
      { region: 'Asia Pacific', percentage: 25 },
      { region: 'Others', percentage: 12 }
    ];
  },

  getCompetitors: async () => {
    // TODO: Replace with actual API call
    return [
      { company: 'NaturalFoods Inc', products: 45, score: 87, trend: '+5%' },
      { company: 'HealthyBites Co', products: 32, score: 82, trend: '+3%' },
      { company: 'GreenTech Foods', products: 28, score: 79, trend: '-1%' }
    ];
  }
};

// AI Suggestions API calls
export const aiAPI = {
  generateSuggestions: async (criteria) => {
    // TODO: Replace with actual API call to AI service
    return [
      { name: 'Turmeric Ginger Energy Drink', score: 94, description: 'Health-focused beverage with anti-inflammatory properties' },
      { name: 'Spiced Coconut Refresher', score: 89, description: 'Tropical flavor with warming spices for mass appeal' },
      { name: 'Green Tea Mint Fusion', score: 87, description: 'Calming blend targeting wellness-conscious consumers' }
    ];
  }
};

// Error handling utility
export const handleAPIError = (error) => {
  console.error('API Error:', error);
  
  // Return user-friendly error messages
  if (error.message.includes('Failed to fetch')) {
    return 'Network error. Please check your connection and try again.';
  }
  
  if (error.message.includes('404')) {
    return 'The requested resource was not found.';
  }
  
  if (error.message.includes('500')) {
    return 'Server error. Please try again later.';
  }
  
  return 'An unexpected error occurred. Please try again.';
};
