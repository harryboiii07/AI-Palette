import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../../context/AppContext';
import ProductTable from './ProductTable';
import { productsAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const ProductAnalysis = () => {
  const { setCurrentScreen } = useAppContext();

  // Local state for products data
  const [productsData, setProductsData] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total_items: 0,
    total_pages: 0,
    has_next: false,
    has_prev: false
  });
  
  // Filter and search state
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  
  // Loading and error state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load products data
  const loadProducts = async (page = 1) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const params = {
        page,
        limit: pagination.per_page,
        ...(categoryFilter && { category: categoryFilter }),
        ...(searchTerm && { search: searchTerm }),
        sort_by: sortBy
      };
      
      const response = await productsAPI.getAll(params);
      
      if (response.success && response.data) {
        setProductsData(response.data);
        setPagination(response.pagination);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Failed to load products:', error);
      setError(`Failed to load products: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Load products when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts(1); // Reset to page 1 when filters change
    }, 300); // Debounce search

    return () => clearTimeout(timer);
  }, [searchTerm, categoryFilter, sortBy]);

  // Initial load
  useEffect(() => {
    loadProducts();
  }, []);

  const handlePageChange = (newPage) => {
    loadProducts(newPage);
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export functionality to be implemented');
  };

  const performanceData = [
    { month: 'Jan', product1: 65, product2: 45, product3: 70 },
    { month: 'Feb', product1: 70, product2: 52, product3: 75 },
    { month: 'Mar', product1: 75, product2: 58, product3: 80 },
    { month: 'Apr', product1: 80, product2: 65, product3: 85 },
  ];

  if (isLoading && productsData.length === 0) {
    return (
      <div style={{ padding: '24px 15%' }}>
        <LoadingSpinner
          size="large"
          message="Loading products..."
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px 15%' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Product Analysis</h2>
          <p style={{ color: '#6b7280', margin: 0 }}>Analyze product performance and market data</p>
        </div>
        
        <button
          onClick={handleExport}
          style={{
            padding: '8px 16px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Data
        </button>
      </div>

      {/* Search and Filter Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
            Search Products
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, ingredients, or flavor..."
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
            Category
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          >
            <option value="">All Categories</option>
            <option value="Beverages">Beverages</option>
            <option value="Snacks">Snacks</option>
            <option value="Dairy">Dairy</option>
            <option value="Cereals">Cereals</option>
            <option value="Confectionery">Confectionery</option>
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          >
            <option value="name">Name</option>
            <option value="market_score">Market Score</option>
            <option value="created_date">Created Date</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>

      {error && (
        <ErrorMessage
          error={error}
          onDismiss={() => setError(null)}
        />
      )}

      {/* Results Summary and Pagination */}
      <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            Showing <strong>{productsData.length}</strong> of <strong>{pagination.total_items}</strong> products
            (Page {pagination.current_page} of {pagination.total_pages})
          </div>
          
          {/* Pagination */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={() => handlePageChange(pagination.current_page - 1)}
              disabled={!pagination.has_prev}
              style={{
                padding: '6px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                backgroundColor: pagination.has_prev ? 'white' : '#f9fafb',
                cursor: pagination.has_prev ? 'pointer' : 'not-allowed',
                fontSize: '14px',
                color: pagination.has_prev ? '#374151' : '#9ca3af'
              }}
            >
              Previous
            </button>
            <span style={{ padding: '6px 12px', fontSize: '14px', fontWeight: '500' }}>
              {pagination.current_page}
            </span>
            <button
              onClick={() => handlePageChange(pagination.current_page + 1)}
              disabled={!pagination.has_next}
              style={{
                padding: '6px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                backgroundColor: pagination.has_next ? 'white' : '#f9fafb',
                cursor: pagination.has_next ? 'pointer' : 'not-allowed',
                fontSize: '14px',
                color: pagination.has_next ? '#374151' : '#9ca3af'
              }}
            >
              Next
            </button>
          </div>
        </div>
        
        {/* Loading indicator for pagination */}
        {isLoading && (
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#6b7280' }}>
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid #f3f3f3',
                borderTop: '2px solid #2563eb',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Loading...
            </div>
          </div>
        )}
      </div>

      {/* Products Table */}
      <ProductTable 
        products={productsData}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      {/* Performance Chart */}
      <div style={{ marginTop: '24px', backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>Product Performance Comparison</h3>
        <div style={{ width: '100%', height: '300px' }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="product1" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="product2" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="product3" stroke="#F59E0B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ProductAnalysis;