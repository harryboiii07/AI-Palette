import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';

const AppContext = createContext();

// Action types for state management
const ACTION_TYPES = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_SUCCESS: 'SET_SUCCESS',
  CLEAR_SUCCESS: 'CLEAR_SUCCESS',
  UPDATE_FORM_DATA: 'UPDATE_FORM_DATA',
  RESET_FORM: 'RESET_FORM',
  SET_FORM_ERRORS: 'SET_FORM_ERRORS',
  CLEAR_FORM_ERRORS: 'CLEAR_FORM_ERRORS'
};

// Initial form state for product creation
const initialFormState = {
  step1: {
    category: '',
    subcategory: '',
    productType: ''
  },
  step2: {
    ageGroup: '',
    region: '',
    income: '',
    lifestyle: ''
  },
  step3: {
    flavors: [],
    dietary: [],
    preferences: []
  },
  step4: {
    selectedSuggestion: null,
    customName: '',
    description: '',
    ingredients: []
  }
};

// Form reducer for complex form state management
const formReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_FORM_DATA:
      return {
        ...state,
        [action.step]: {
          ...state[action.step],
          ...action.payload
        }
      };
    case ACTION_TYPES.RESET_FORM:
      return initialFormState;
    default:
      return state;
  }
};

// Global state reducer for loading, errors, and notifications
const globalStateReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.key]: action.payload
        }
      };
    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.key]: action.payload
        }
      };
    case ACTION_TYPES.CLEAR_ERROR:
      const { [action.key]: removed, ...restErrors } = state.errors;
      return {
        ...state,
        errors: restErrors
      };
    case ACTION_TYPES.SET_SUCCESS:
      return {
        ...state,
        success: {
          ...state.success,
          [action.key]: action.payload
        }
      };
    case ACTION_TYPES.CLEAR_SUCCESS:
      const { [action.key]: removedSuccess, ...restSuccess } = state.success;
      return {
        ...state,
        success: restSuccess
      };
    case ACTION_TYPES.SET_FORM_ERRORS:
      return {
        ...state,
        formErrors: {
          ...state.formErrors,
          [action.step]: action.payload
        }
      };
    case ACTION_TYPES.CLEAR_FORM_ERRORS:
      const { [action.step]: removedFormErrors, ...restFormErrors } = state.formErrors;
      return {
        ...state,
        formErrors: restFormErrors
      };
    default:
      return state;
  }
};

const initialGlobalState = {
  loading: {},
  errors: {},
  success: {},
  formErrors: {}
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Navigation and UI state
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // User preferences state
  const [userPreferences, setUserPreferences] = useState(() => {
    const saved = localStorage.getItem('flavorforge_preferences');
    return saved ? JSON.parse(saved) : {
      theme: 'light',
      language: 'en',
      notifications: true,
      autoSave: true,
      chartType: 'bar',
      itemsPerPage: 10,
      favoriteCategories: []
    };
  });

  // Global state management with reducer
  const [globalState, dispatchGlobal] = useReducer(globalStateReducer, initialGlobalState);

  // Form state management with reducer
  const [formData, dispatchForm] = useReducer(formReducer, initialFormState);

  // Save user preferences to localStorage
  useEffect(() => {
    localStorage.setItem('flavorforge_preferences', JSON.stringify(userPreferences));
  }, [userPreferences]);

  // Auto-save form data
  useEffect(() => {
    if (userPreferences.autoSave) {
      localStorage.setItem('flavorforge_form_draft', JSON.stringify(formData));
    }
  }, [formData, userPreferences.autoSave]);

  // Load saved form draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('flavorforge_form_draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        dispatchForm({ type: 'LOAD_DRAFT', payload: draft });
      } catch (error) {
        console.error('Failed to load form draft:', error);
      }
    }
  }, []);

  // Helper functions for loading states
  const setLoading = (key, isLoading) => {
    dispatchGlobal({
      type: ACTION_TYPES.SET_LOADING,
      key,
      payload: isLoading
    });
  };

  const isLoading = (key) => {
    return globalState.loading[key] || false;
  };

  // Helper functions for error handling
  const setError = (key, error) => {
    dispatchGlobal({
      type: ACTION_TYPES.SET_ERROR,
      key,
      payload: error
    });
  };

  const clearError = (key) => {
    dispatchGlobal({
      type: ACTION_TYPES.CLEAR_ERROR,
      key
    });
  };

  const getError = (key) => {
    return globalState.errors[key] || null;
  };

  // Helper functions for success messages
  const setSuccess = (key, message) => {
    dispatchGlobal({
      type: ACTION_TYPES.SET_SUCCESS,
      key,
      payload: message
    });
    
    // Auto clear success message after 5 seconds
    setTimeout(() => {
      clearSuccess(key);
    }, 5000);
  };

  const clearSuccess = (key) => {
    dispatchGlobal({
      type: ACTION_TYPES.CLEAR_SUCCESS,
      key
    });
  };

  const getSuccess = (key) => {
    return globalState.success[key] || null;
  };

  // Form validation helpers
  const validateStep = (step) => {
    const errors = {};
    
    switch (step) {
      case 1:
        if (!formData.step1.category) errors.category = 'Please select a category';
        break;
      case 2:
        if (!formData.step2.ageGroup) errors.ageGroup = 'Please select an age group';
        if (!formData.step2.region) errors.region = 'Please select a region';
        break;
      case 3:
        if (formData.step3.flavors.length === 0) errors.flavors = 'Please select at least one flavor';
        break;
      case 4:
        if (!formData.step4.selectedSuggestion && !formData.step4.customName) {
          errors.selection = 'Please select a suggestion or provide a custom name';
        }
        break;
      default:
        break;
    }

    if (Object.keys(errors).length > 0) {
      dispatchGlobal({
        type: ACTION_TYPES.SET_FORM_ERRORS,
        step: `step${step}`,
        payload: errors
      });
      return false;
    } else {
      dispatchGlobal({
        type: ACTION_TYPES.CLEAR_FORM_ERRORS,
        step: `step${step}`
      });
      return true;
    }
  };

  // Form helper functions
  const updateFormData = (step, data) => {
    dispatchForm({
      type: ACTION_TYPES.UPDATE_FORM_DATA,
      step,
      payload: data
    });
  };

  const resetForm = () => {
    dispatchForm({ type: ACTION_TYPES.RESET_FORM });
    localStorage.removeItem('flavorforge_form_draft');
  };

  const getFormErrors = (step) => {
    return globalState.formErrors[step] || {};
  };

  // Navigation helper with validation
  const navigateToStep = (step) => {
    if (step > currentStep) {
      // Validate current step before moving forward
      if (validateStep(currentStep)) {
        setCurrentStep(step);
      }
    } else {
      // Allow going back without validation
      setCurrentStep(step);
    }
  };

  // User preference helpers
  const updatePreference = (key, value) => {
    setUserPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const togglePreference = (key) => {
    setUserPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Sample data - will be moved to API service later
  const dashboardData = {
    totalProducts: 0,
    successRate: 0,
    activeUsers: 0,
    trendingCategories: 0,
    growthMetrics: {
      productsGrowth: 0,
      successRateGrowth: 0,
      usersGrowth: 0
    },
    chartData: [
      { month: 'Jan', beverages: 65, snacks: 45, dairy: 30 },
      { month: 'Feb', beverages: 70, snacks: 50, dairy: 35 },
      { month: 'Mar', beverages: 75, snacks: 55, dairy: 40 },
      { month: 'Apr', beverages: 80, snacks: 60, dairy: 45 }
    ]
  };

  const productsData = [
    { id: 1, name: 'Spiced Turmeric Latte', category: 'Beverages', score: 92, status: 'Active', created: '2024-08-01' },
    { id: 2, name: 'Coconut Quinoa Bites', category: 'Snacks', score: 87, status: 'Testing', created: '2024-07-28' },
    { id: 3, name: 'Green Tea Yogurt', category: 'Dairy', score: 94, status: 'Active', created: '2024-07-25' },
    { id: 4, name: 'Mango Chili Chips', category: 'Snacks', score: 89, status: 'Active', created: '2024-07-20' },
    { id: 5, name: 'Oat Milk Matcha', category: 'Beverages', score: 91, status: 'Active', created: '2024-07-15' },
    { id: 6, name: 'Protein Chickpea Pasta', category: 'Cereals', score: 85, status: 'Testing', created: '2024-07-10' },
    { id: 7, name: 'Hibiscus Ginger Tea', category: 'Beverages', score: 88, status: 'Active', created: '2024-07-05' },
    { id: 8, name: 'Dark Chocolate Quinoa', category: 'Confectionery', score: 93, status: 'Active', created: '2024-06-30' }
  ];

  const trendsData = {
    trendingIngredients: [
      { name: 'Turmeric', score: 85, growth: '+12%' },
      { name: 'Green Tea', score: 78, growth: '+8%' },
      { name: 'Coconut', score: 72, growth: '+15%' },
      { name: 'Quinoa', score: 68, growth: '+6%' }
    ],
    regionalData: [
      { region: 'North America', percentage: 35 },
      { region: 'Europe', percentage: 28 },
      { region: 'Asia Pacific', percentage: 25 },
      { region: 'Others', percentage: 12 }
    ],
    timelineData: [
      { month: 'Jan', healthy: 65, organic: 45, plantBased: 30, functional: 25 },
      { month: 'Feb', healthy: 70, organic: 50, plantBased: 35, functional: 30 },
      { month: 'Mar', healthy: 75, organic: 55, plantBased: 40, functional: 35 },
      { month: 'Apr', healthy: 80, organic: 60, plantBased: 45, functional: 40 },
      { month: 'May', healthy: 78, organic: 65, plantBased: 50, functional: 45 },
      { month: 'Jun', healthy: 85, organic: 70, plantBased: 55, functional: 50 }
    ]
  };

  const competitorsData = [
    { company: 'NaturalFoods Inc', products: 45, score: 87, trend: '+5%' },
    { company: 'HealthyBites Co', products: 32, score: 82, trend: '+3%' },
    { company: 'GreenTech Foods', products: 28, score: 79, trend: '-1%' }
  ];

  const aiSuggestions = [
    { name: 'Turmeric Ginger Energy Drink', score: 94, description: 'Health-focused beverage with anti-inflammatory properties' },
    { name: 'Spiced Coconut Refresher', score: 89, description: 'Tropical flavor with warming spices for mass appeal' },
    { name: 'Green Tea Mint Fusion', score: 87, description: 'Calming blend targeting wellness-conscious consumers' }
  ];

  // Filter products based on search and category
  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const value = {
    // Navigation State
    currentScreen,
    setCurrentScreen,
    currentStep,
    setCurrentStep,
    navigateToStep,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    
    // Loading States
    setLoading,
    isLoading,
    
    // Error Handling
    setError,
    clearError,
    getError,
    
    // Success Messages
    setSuccess,
    clearSuccess,
    getSuccess,
    
    // User Preferences
    userPreferences,
    updatePreference,
    togglePreference,
    
    // Form Management
    formData,
    updateFormData,
    resetForm,
    validateStep,
    getFormErrors,
    
    // Data
    dashboardData,
    productsData,
    trendsData,
    competitorsData,
    aiSuggestions,
    filteredProducts
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};