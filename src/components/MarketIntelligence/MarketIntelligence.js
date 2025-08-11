import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { useAppContext } from '../../context/AppContext';
import { marketAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const MarketIntelligence = () => {
  const { isLoading, setLoading, getError, setError, clearError } = useAppContext();
  
  // State for data
  const [trendingIngredients, setTrendingIngredients] = useState([]);
  const [regionalData, setRegionalData] = useState([]);
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [competitorsData, setCompetitorsData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({ ingredients: [], regions: [], categories: [] });
  
  // State for filters
  const [filters, setFilters] = useState({
    ingredient: '',
    region: '',
    category: '',
    month: ''
  });
  
  // State for UI
  const [showAllIngredients, setShowAllIngredients] = useState(false);

  // Load initial data and filter options
  useEffect(() => {
    const loadInitialData = async () => {
      console.log('🚀 MarketIntelligence: Loading initial data...');
      
      try {
        console.log('🔧 Loading filter options...');
        // Load filter options first
        const options = await marketAPI.getFilterOptions();
        console.log('✅ Filter options loaded:', options);
        setFilterOptions(options);
        
        console.log('📊 Loading market data...');
        // Load all data with current filters
        await loadMarketData();
        console.log('✅ Initial data loading complete');
      } catch (error) {
        console.error('💥 Failed to load initial data:', error);
        console.error('🔍 Error context:', {
          component: 'MarketIntelligence',
          operation: 'loadInitialData',
          error: error.message,
          stack: error.stack
        });
        setError('marketIntelligence', `Failed to load market intelligence data: ${error.message}`);
      }
    };
    
    loadInitialData();
  }, []);

  // Reload data when filters change
  useEffect(() => {
    console.log('🔄 Filters changed, checking if reload needed:', filters);
    console.log('📋 Filter options available:', filterOptions.ingredients.length > 0);
    
    if (filterOptions.ingredients.length > 0) { // Only reload if filter options are loaded
      console.log('✅ Reloading market data due to filter change');
      loadMarketData();
    } else {
      console.log('⏳ Skipping reload - filter options not yet loaded');
    }
  }, [filters]);

  const loadMarketData = async () => {
    console.log('📊 loadMarketData called with filters:', filters);
    
    setLoading('marketIntelligence', true);
    clearError('marketIntelligence');
    
    try {
      console.log('🔄 Making parallel API calls...');
      const [ingredients, regional, timeSeries, competitors] = await Promise.all([
        marketAPI.getTrendingIngredients(filters),
        marketAPI.getRegionalData(filters),
        marketAPI.getTimeSeriesData(filters),
        marketAPI.getCompetitors()
      ]);
      
      console.log('✅ All API calls completed successfully');
      console.log('📈 Results:', {
        ingredients: ingredients.length,
        regional: regional.length,
        timeSeries: timeSeries.length,
        competitors: competitors.length
      });
      
      setTrendingIngredients(ingredients);
      setRegionalData(regional);
      setTimeSeriesData(timeSeries);
      setCompetitorsData(competitors);
      
      console.log('✅ State updated successfully');
    } catch (error) {
      console.error('💥 loadMarketData failed:', error);
      console.error('🔍 Error context:', {
        component: 'MarketIntelligence',
        operation: 'loadMarketData',
        filters,
        error: error.message,
        stack: error.stack
      });
      setError('marketIntelligence', `Failed to load market data: ${error.message}`);
    } finally {
      setLoading('marketIntelligence', false);
      console.log('🏁 loadMarketData completed');
    }
  };

  const handleFilterChange = (filterType, value) => {
    console.log('🔧 Filter change requested:', { filterType, value });
    
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [filterType]: value
      };
      console.log('✅ Filters updated:', newFilters);
      return newFilters;
    });
  };

  const clearFilters = () => {
    console.log('🧹 Clearing all filters');
    setFilters({
      ingredient: '',
      region: '',
      category: '',
      month: ''
    });
  };

  const hasActiveFilters = filters.ingredient || filters.region || filters.category || filters.month;

  // Process regional data for pie chart
  const regionalPieData = regionalData.map((item, index) => ({
    name: item.region,
    value: item.percentage,
    color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F97316'][index % 6]
  }));

  // Display limited or all ingredients
  const displayedIngredients = showAllIngredients ? trendingIngredients : trendingIngredients.slice(0, 6);

  return (
    <div style={{ padding: '24px 15%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', margin: 0 }}>Market Intelligence</h2>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f3f4f6',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 16px 0' }}>Filters</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Specific Ingredient
            </label>
            <select
              value={filters.ingredient}
              onChange={(e) => handleFilterChange('ingredient', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              <option value="">All Ingredients</option>
              {filterOptions.ingredients.map(ingredient => (
                <option key={ingredient} value={ingredient}>{ingredient}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Region Focus
            </label>
            <select
              value={filters.region}
              onChange={(e) => handleFilterChange('region', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              <option value="">All Regions</option>
              {filterOptions.regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Product Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              <option value="">All Categories</option>
              {filterOptions.categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Time Period
            </label>
            <select
              value={filters.month}
              onChange={(e) => handleFilterChange('month', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              <option value="">All Months</option>
              <option value="6">June 2024</option>
              <option value="7">July 2024</option>
              <option value="8">August 2024</option>
              <option value="9">September 2024</option>
              <option value="10">October 2024</option>
              <option value="11">November 2024</option>
            </select>
          </div>
        </div>
        
        {hasActiveFilters && (
          <div style={{ marginTop: '12px', padding: '8px 12px', backgroundColor: '#dbeafe', borderRadius: '6px', fontSize: '14px', color: '#1d4ed8' }}>
            <strong>Active Filters: </strong>
            {filters.ingredient && `Ingredient: ${filters.ingredient}`}
            {filters.ingredient && (filters.region || filters.category || filters.month) && ', '}
            {filters.region && `Region: ${filters.region}`}
            {filters.region && (filters.category || filters.month) && ', '}
            {filters.category && `Category: ${filters.category}`}
            {filters.category && filters.month && ', '}
            {filters.month && `Month: ${filters.month === '6' ? 'June' : filters.month === '7' ? 'July' : filters.month === '8' ? 'August' : filters.month === '9' ? 'September' : filters.month === '10' ? 'October' : filters.month === '11' ? 'November' : filters.month} 2024`}
          </div>
        )}
      </div>

      {/* Error Display */}
      {getError('marketIntelligence') && (
        <ErrorMessage 
          error={getError('marketIntelligence')} 
          onDismiss={() => clearError('marketIntelligence')}
        />
      )}

      {/* Loading State */}
      {isLoading('marketIntelligence') && (
        <div style={{ backgroundColor: 'white', padding: '48px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
          <LoadingSpinner message="Loading market intelligence data..." />
        </div>
      )}

      {/* Main Content */}
      {!isLoading('marketIntelligence') && !getError('marketIntelligence') && (
        <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            {/* Trending Ingredients */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Trending Ingredients</h3>
                {trendingIngredients.length > 6 && (
                  <button
                    onClick={() => setShowAllIngredients(!showAllIngredients)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: 'transparent',
                      color: '#2563eb',
                      border: 'none',
                      fontSize: '12px',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    {showAllIngredients ? 'Show Less' : `Show All (${trendingIngredients.length})`}
                  </button>
                )}
              </div>
              
              {displayedIngredients.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#6b7280', padding: '24px' }}>
                  No trending ingredients found for the selected filters.
                </div>
              ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {displayedIngredients.map((ingredient, idx) => (
                    <div key={idx} style={{ padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div>
                          <span style={{ fontWeight: '600', fontSize: '16px' }}>{ingredient.name}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '14px', fontWeight: '500' }}>Avg: {ingredient.score}</div>
                            {ingredient.maxScore && (
                              <div style={{ fontSize: '12px', color: '#6b7280' }}>Peak: {ingredient.maxScore}</div>
                            )}
                            <div style={{ width: '80px', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}>
                              <div style={{
                                width: `${Math.min(ingredient.score, 100)}%`,
                                height: '8px',
                                backgroundColor: '#2563eb',
                                borderRadius: '4px'
                              }}></div>
                            </div>
                          </div>
                          <span style={{ color: '#10b981', fontSize: '14px', fontWeight: '500' }}>{ingredient.growth}</span>
                        </div>
                      </div>
                      
                      {/* Additional info */}
                      <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#6b7280' }}>
                        {ingredient.categoriesCount && (
                          <span>📂 {ingredient.categoriesCount} categories</span>
                        )}
                        {ingredient.regionsCount && (
                          <span>🌍 {ingredient.regionsCount} regions</span>
                        )}
                        {ingredient.categories && (
                          <span title={ingredient.categories.join(', ')}>
                            Categories: {ingredient.categories.slice(0, 2).join(', ')}
                            {ingredient.categories.length > 2 && ` +${ingredient.categories.length - 2} more`}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
        </div>

            {/* Regional Preferences */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>Regional Preferences</h3>
              {regionalPieData.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#6b7280', padding: '24px' }}>
                  No regional data found for the selected filters.
                </div>
              ) : (
                <div style={{ width: '100%', height: '200px' }}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={regionalPieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                        label={({name, value}) => `${name}: ${value}%`}
                        labelLine={false}
                >
                  {regionalPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
              )}
        </div>
      </div>

          {/* Market Trends Over Time */}
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>Market Trends Over Time</h3>
            {timeSeriesData.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#6b7280', padding: '48px' }}>
                No time series data found for the selected filters.
              </div>
            ) : (
              <div style={{ width: '100%', height: '350px' }}>
          <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="avg_popularity" 
                      stroke="#3B82F6" 
                      strokeWidth={2} 
                      name="Average Popularity Score" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="avg_growth_rate" 
                      stroke="#10B981" 
                      strokeWidth={2} 
                      name="Average Growth Rate %" 
                    />
            </LineChart>
          </ResponsiveContainer>
        </div>
            )}
      </div>

          {/* Competitive Landscape */}
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>Competitive Landscape</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {competitorsData.map((competitor, idx) => (
            <div key={idx} style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <h4 style={{ fontWeight: '500', margin: '0 0 8px 0' }}>{competitor.company}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Products:</span>
                  <span>{competitor.products}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Avg Score:</span>
                  <span>{competitor.score}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Growth:</span>
                  <span style={{ color: competitor.trend.startsWith('+') ? '#10b981' : '#ef4444' }}>
                    {competitor.trend}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
        </>
      )}
    </div>
  );
};

export default MarketIntelligence;
