// API service layer for handling backend calls
// Enhanced with proper error handling and loading states


const API_BASE_URL = process.env.REACT_APP_API_URL || (
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000'
);

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

  console.log('🌐 API Request Details:', {
    url,
    method: config.method || 'GET',
    headers: config.headers,
    body: config.body || 'none',
    loadingKey
  });

  // Set loading state if context is available
  if (globalContext && loadingKey) {
    globalContext.setLoading(loadingKey, true);
    console.log(`⏳ Loading state set for: ${loadingKey}`);
  }

  try {
    console.log('📡 Sending fetch request...');
    const response = await fetch(url, config);
    console.log('📥 Response received:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries())
    });
    
    if (!response.ok) {
      console.log('❌ Response not OK, attempting to parse error...');
      
      let errorData;
      try {
        errorData = await response.json();
        console.log('📋 Error response data:', errorData);
      } catch (parseError) {
        console.error('💥 Failed to parse error response:', parseError);
        errorData = {};
      }
      
      const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
      console.error('🚨 Throwing API error:', errorMessage);
      throw new Error(errorMessage);
    }
    
    console.log('📦 Parsing successful response...');
    const data = await response.json();
    console.log('✅ Parsed response data:', data);
    
    // Clear any previous errors
    if (globalContext && loadingKey) {
      globalContext.clearError(loadingKey);
      console.log(`🧹 Cleared errors for: ${loadingKey}`);
    }
    
    return data;
  } catch (error) {
    console.error('💥 API request failed with error:', error);
    console.error('🔍 Full error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      url,
      loadingKey
    });
    
    // Set error state if context is available
    if (globalContext && loadingKey) {
      const userFriendlyError = handleAPIError(error);
      globalContext.setError(loadingKey, userFriendlyError);
      console.log(`❌ Error state set for ${loadingKey}:`, userFriendlyError);
    }
    
    throw error;
  } finally {
    // Clear loading state
    if (globalContext && loadingKey) {
      globalContext.setLoading(loadingKey, false);
      console.log(`✅ Loading cleared for: ${loadingKey}`);
    }
  }
};

// Simulate network delay for development
const simulateDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// Dashboard API calls
export const dashboardAPI = {
  // Get dashboard metrics from real backend endpoint with filters
  getMetrics: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    // Default values
    const region = filters.region || 'Global';
    const timeframe = filters.timeframe || '30d';
    
    queryParams.append('region', region);
    queryParams.append('timeframe', timeframe);
    
    const endpoint = `/api/dashboard/metrics?${queryParams.toString()}`;
    
    return await apiRequest(endpoint, {
      method: 'GET'
    }, 'dashboard');
  },

  // Direct API call without global loading states (for polling)
  getMetricsQuiet: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    // Default values
    const region = filters.region || 'Global';
    const timeframe = filters.timeframe || '30d';
    
    queryParams.append('region', region);
    queryParams.append('timeframe', timeframe);
    
    const url = `${API_BASE_URL}/api/dashboard/metrics?${queryParams.toString()}`;
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
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

  // New API methods for backend integration
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    // Add parameters if provided
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.category) queryParams.append('category', params.category);
    if (params.search) queryParams.append('search', params.search);
    if (params.sort_by) queryParams.append('sort_by', params.sort_by);
    
    const endpoint = `/api/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    return await apiRequest(endpoint, {
      method: 'GET'
    }, 'products');
  },
  
  // Create new product using real API
  create: async (productData) => {
    console.log('Creating product with data:', productData);
    return await apiRequest('/api/products', {
      method: 'POST',
      body: JSON.stringify(productData)
    }, 'createProduct');
  },

  // Analyze product concept using real API
  analyzeProduct: async (productConcept) => {
    console.log('🔬 Analyzing product concept:', productConcept);
    
    try {
      const result = await apiRequest('/api/analyze-product', {
        method: 'POST',
        body: JSON.stringify(productConcept)
      }, 'analyzeProduct');
      
      console.log('✅ Product analysis completed:', result);
      return result;
    } catch (error) {
      console.error('💥 Product analysis failed:', error);
      console.error('🔍 Analysis error details:', {
        productConcept,
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
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
  // Get market trends with optional filters
  getTrends: async (filters = {}) => {
    console.log('🚀 getTrends API call initiated with filters:', filters);
    
    const queryParams = new URLSearchParams();
    
    // Add optional filters
    if (filters.region) {
      queryParams.append('region', filters.region);
      console.log('🌍 Added region filter:', filters.region);
    }
    if (filters.category) {
      queryParams.append('category', filters.category);
      console.log('📂 Added category filter:', filters.category);
    }
    if (filters.ingredient) {
      queryParams.append('ingredient', filters.ingredient);
      console.log('🧪 Added ingredient filter:', filters.ingredient);
    }
    if (filters.month) {
      queryParams.append('month', filters.month);
      console.log('📅 Added month filter:', filters.month);
    }
    
    const endpoint = `/api/market-trends${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    console.log('🎯 Making API request to:', `${API_BASE_URL}${endpoint}`);
    
    try {
      const result = await apiRequest(endpoint, {
        method: 'GET'
      }, 'marketTrends');
      
      console.log('✅ getTrends API call successful, result:', result);
      return result;
    } catch (error) {
      console.error('💥 getTrends API call failed:', error);
      console.error('🔍 Error details:', {
        message: error.message,
        stack: error.stack,
        endpoint,
        filters
      });
      throw error;
    }
  },

  // Legacy methods - keeping for backwards compatibility but will use new endpoint data
  getTrendingIngredients: async (filters = {}) => {
    console.log('🔍 getTrendingIngredients called with filters:', filters);
    
    try {
      // This will now use data from the trends endpoint
      const trendsData = await marketAPI.getTrends(filters);
      console.log('📊 Raw trends data received:', trendsData);
      
      if (trendsData && trendsData.success && trendsData.data && trendsData.data.trends) {
        // Group by ingredient and aggregate scores
        const ingredientMap = new Map();
        
        trendsData.data.trends.forEach(trend => {
          const ingredientName = trend.ingredient_name;
          
          if (ingredientMap.has(ingredientName)) {
            const existing = ingredientMap.get(ingredientName);
            // Calculate weighted average based on number of entries
            existing.totalScore += trend.popularity_score;
            existing.totalGrowth += trend.growth_rate;
            existing.count += 1;
            existing.maxScore = Math.max(existing.maxScore, trend.popularity_score);
            existing.categories.add(trend.category);
            existing.regions.add(trend.region);
          } else {
            ingredientMap.set(ingredientName, {
              name: ingredientName,
              totalScore: trend.popularity_score,
              totalGrowth: trend.growth_rate,
              maxScore: trend.popularity_score,
              count: 1,
              categories: new Set([trend.category]),
              regions: new Set([trend.region])
            });
          }
        });
        
        // Convert to final format with aggregated data
        const processedData = Array.from(ingredientMap.values())
          .map(ingredient => ({
            name: ingredient.name,
            score: Math.round(ingredient.totalScore / ingredient.count), // Average score
            maxScore: Math.round(ingredient.maxScore), // Peak score
            growth: `+${(ingredient.totalGrowth / ingredient.count).toFixed(1)}%`, // Average growth
            categoriesCount: ingredient.categories.size,
            regionsCount: ingredient.regions.size,
            categories: Array.from(ingredient.categories),
            regions: Array.from(ingredient.regions)
          }))
          .sort((a, b) => b.score - a.score); // Sort by average score descending
        
        console.log('✅ Processed and aggregated trending ingredients:', processedData);
        return processedData;
      } else {
        console.error('❌ Invalid trends data structure:', {
          hasSuccess: trendsData?.success,
          hasData: !!trendsData?.data,
          hasTrends: !!trendsData?.data?.trends,
          dataKeys: trendsData?.data ? Object.keys(trendsData.data) : 'no data'
        });
        throw new Error('Invalid API response structure for trending ingredients');
      }
    } catch (error) {
      console.error('💥 getTrendingIngredients failed:', error);
      throw error;
    }
  },

  getRegionalData: async (filters = {}) => {
    console.log('🌍 getRegionalData called with filters:', filters);
    
    try {
      // This will now use data from the trends endpoint aggregated by region
      const trendsData = await marketAPI.getTrends(filters);
      console.log('📊 Raw trends data for regional analysis:', trendsData);
      
      if (trendsData && trendsData.success && trendsData.data && trendsData.data.trends) {
        // Group by region and calculate percentages
        const regionCounts = {};
        trendsData.data.trends.forEach(trend => {
          const region = trend.region;
          regionCounts[region] = (regionCounts[region] || 0) + 1;
        });
        
        console.log('📈 Region counts:', regionCounts);
        
        const total = Object.values(regionCounts).reduce((sum, count) => sum + count, 0);
        const processedData = Object.entries(regionCounts).map(([region, count]) => ({
          region,
          percentage: Math.round((count / total) * 100)
        }));
        
        console.log('✅ Processed regional data:', processedData);
        return processedData;
      } else {
        console.error('❌ Invalid trends data structure for regional data:', {
          hasSuccess: trendsData?.success,
          hasData: !!trendsData?.data,
          hasTrends: !!trendsData?.data?.trends,
          trendsCount: trendsData?.data?.trends?.length || 0
        });
        throw new Error('Invalid API response structure for regional data');
      }
    } catch (error) {
      console.error('💥 getRegionalData failed:', error);
      throw error;
    }
  },

  getTimeSeriesData: async (filters = {}) => {
    console.log('📅 getTimeSeriesData called with filters:', filters);
    
    try {
      // Extract time series data from the trends endpoint
      const trendsData = await marketAPI.getTrends(filters);
      console.log('📊 Raw trends data for time series:', trendsData);
      
      if (trendsData && trendsData.success && trendsData.data && trendsData.data.time_series) {
        const processedData = trendsData.data.time_series.map(item => ({
          month: new Date(item.year, item.month - 1).toLocaleString('default', { month: 'short' }),
          year: item.year,
          avg_popularity: item.avg_popularity,
          avg_growth_rate: item.avg_growth_rate
        }));
        
        console.log('✅ Processed time series data:', processedData);
        return processedData;
      } else {
        console.error('❌ Invalid trends data structure for time series:', {
          hasSuccess: trendsData?.success,
          hasData: !!trendsData?.data,
          hasTimeSeries: !!trendsData?.data?.time_series,
          dataKeys: trendsData?.data ? Object.keys(trendsData.data) : 'no data',
          timeSeriesLength: trendsData?.data?.time_series?.length || 0
        });
        throw new Error('Invalid API response structure for time series data');
      }
    } catch (error) {
      console.error('💥 getTimeSeriesData failed:', error);
      throw error;
    }
  },

  getCompetitors: async () => {
    // TODO: Replace with actual API call when competitor endpoint is available
    return [
      { company: 'NaturalFoods Inc', products: 45, score: 87, trend: '+5%' },
      { company: 'HealthyBites Co', products: 32, score: 82, trend: '+3%' },
      { company: 'GreenTech Foods', products: 28, score: 79, trend: '-1%' }
    ];
  },

  // Get available filter options from the API
  getFilterOptions: async () => {
    console.log('🔧 getFilterOptions called');
    
    try {
      const trendsData = await marketAPI.getTrends();
      console.log('📊 Raw trends data for filter options:', trendsData);
      
      if (trendsData && trendsData.success && trendsData.data && trendsData.data.trends) {
        const trends = trendsData.data.trends;
        console.log('📋 Processing filter options from trends:', trends.length, 'items');
        
        const filterOptions = {
          ingredients: [...new Set(trends.map(t => t.ingredient_name))].sort(),
          regions: [...new Set(trends.map(t => t.region))].sort(),
          categories: [...new Set(trends.map(t => t.category))].sort()
        };
        
        console.log('✅ Processed filter options:', filterOptions);
        return filterOptions;
      } else {
        console.error('❌ Invalid trends data structure for filter options:', {
          hasSuccess: trendsData?.success,
          hasData: !!trendsData?.data,
          hasTrends: !!trendsData?.data?.trends,
          trendsCount: trendsData?.data?.trends?.length || 0
        });
        throw new Error('Invalid API response structure for filter options');
      }
    } catch (error) {
      console.error('💥 getFilterOptions failed:', error);
      throw error;
    }
  }
};

// Competitors API calls
export const competitorsAPI = {
  // Get competitors with optional category filter
  getCompetitors: async (filters = {}) => {
    console.log('🏆 getCompetitors called with filters:', filters);
    
    const queryParams = new URLSearchParams();
    
    // Add optional category filter
    if (filters.category) {
      queryParams.append('category', filters.category);
      console.log('📂 Added category filter:', filters.category);
    }
    
    const endpoint = `/api/competitors${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    console.log('🎯 Making API request to:', `${API_BASE_URL}${endpoint}`);
    
    try {
      const result = await apiRequest(endpoint, {
        method: 'GET'
      }, 'competitors');
      
      console.log('✅ getCompetitors API call successful, result:', result);
      return result;
    } catch (error) {
      console.error('💥 getCompetitors API call failed:', error);
      console.error('🔍 Error details:', {
        message: error.message,
        stack: error.stack,
        endpoint,
        filters
      });
      throw error;
    }
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
  console.error('🚨 handleAPIError called with:', error);
  
  const errorDetails = {
    name: error.name,
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  };
  
  console.error('📋 Error classification details:', errorDetails);
  
  // Return user-friendly error messages
  if (error.message.includes('Failed to fetch')) {
    console.log('🌐 Network error detected');
    return 'Network error. Please check your connection and try again.';
  }
  
  if (error.message.includes('404')) {
    console.log('🔍 404 error detected');
    return 'The requested resource was not found. Please check if the API endpoint exists.';
  }
  
  if (error.message.includes('500')) {
    console.log('🔥 Server error detected');
    return 'Server error. Please try again later.';
  }
  
  if (error.message.includes('422')) {
    console.log('📝 Validation error detected');
    return 'Request validation failed. Please check your data format.';
  }
  
  console.log('❓ Unknown error type, returning generic message');
  return `An unexpected error occurred: ${error.message}`;
};
