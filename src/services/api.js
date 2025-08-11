// API service layer for handling backend calls
// Enhanced with proper error handling and loading states


const API_BASE_URL = process.env.REACT_APP_API_URL;

// Global context reference for loading and error states
let globalContext = null;

export const initializeAPI = (context) => {
  globalContext = context;
};

// Utility function for making HTTP requests with loading states
const apiRequest = async (endpoint, options = {}, loadingKey = null) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Set loading state if context is available
  if (globalContext && loadingKey) {
    globalContext.setLoading(loadingKey, true);
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Clear any previous errors
    if (globalContext && loadingKey) {
      globalContext.clearError(loadingKey);
    }
    
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    
    // Set error state if context is available
    if (globalContext && loadingKey) {
      globalContext.setError(loadingKey, handleAPIError(error));
    }
    
    throw error;
  } finally {
    // Clear loading state
    if (globalContext && loadingKey) {
      globalContext.setLoading(loadingKey, false);
    }
  }
};

// Simulate network delay for development
const simulateDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// Dashboard API calls
export const dashboardAPI = {
  getMetrics: async () => {
    await simulateDelay(800);
    
    // Simulate occasional errors for testing
    if (Math.random() < 0.1) {
      throw new Error('Failed to fetch dashboard metrics');
    }
    
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
    await simulateDelay(600);
    
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
    await simulateDelay(500);
    
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
    await simulateDelay(2000);
    
    // Simulate validation errors
    if (!productData.category) {
      throw new Error('Product category is required');
    }
    
    // Simulate success
    return {
      id: Date.now(),
      ...productData,
      status: 'Testing',
      created: new Date().toISOString().split('T')[0],
      score: Math.floor(Math.random() * 20) + 80
    };
  },

  updateProduct: async (productId, productData) => {
    await simulateDelay(1000);
    return { id: productId, ...productData };
  },

  deleteProduct: async (productId) => {
    await simulateDelay(500);
    return { success: true, id: productId };
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
