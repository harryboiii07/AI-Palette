import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAppContext } from '../../context/AppContext';
import { competitorsAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const Competitors = () => {
  const { isLoading, setLoading, getError, setError, clearError } = useAppContext();
  
  // State for data
  const [competitors, setCompetitors] = useState([]);
  const [marketAnalysis, setMarketAnalysis] = useState(null);
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);
  const [regionalAnalysis, setRegionalAnalysis] = useState([]);
  
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState('');
  const [availableCategories, setAvailableCategories] = useState([]);

  // Load data on mount and when category filter changes
  useEffect(() => {
    const loadData = async () => {
      console.log('🏆 Competitors: useEffect triggered! Loading data for category:', selectedCategory || 'All Categories');
      console.log('🏆 Current state - selectedCategory:', selectedCategory);
      console.log('🏆 Current state - availableCategories:', availableCategories);
      
      try {
        await loadCompetitorsData(selectedCategory);
      } catch (error) {
        console.error('💥 Failed to load competitors data:', error);
      }
    };
    
    loadData();
  }, [selectedCategory]);

  const loadCompetitorsData = async (categoryFilter = '') => {
    console.log('📊 Loading competitors data with category:', categoryFilter);
    
    setLoading('competitors', true);
    clearError('competitors');
    
    try {
      const filters = categoryFilter ? { category: categoryFilter } : {};
      const response = await competitorsAPI.getCompetitors(filters);
      
      if (response.success && response.data) {
        console.log('✅ Competitors data loaded successfully:', response.data);
        console.log('📊 Market Analysis:', response.data.market_analysis);
        console.log('📊 Category Breakdown:', response.data.category_breakdown);
        console.log('🏢 Competitors:', response.data.competitors);
        
        setCompetitors(response.data.competitors || []);
        setMarketAnalysis(response.data.market_analysis || null);
        setCategoryBreakdown(response.data.category_breakdown || []);
        setRegionalAnalysis(response.data.regional_analysis || []);
        
        // Extract available categories for filter
        if (Array.isArray(response.data.competitors)) {
          const categories = [...new Set(response.data.competitors.map(c => c.primary_category))].filter(Boolean);
          setAvailableCategories(categories);
          console.log('📂 Available categories:', categories);
        } else {
          console.log('⚠️ No competitors array found in response');
          setAvailableCategories([]);
        }
      } else {
        throw new Error('Invalid response format from competitors API');
      }
    } catch (error) {
      console.error('💥 Failed to load competitors data:', error);
      setError('competitors', `Failed to load competitors data: ${error.message}`);
    } finally {
      setLoading('competitors', false);
    }
  };

  const handleCategoryChange = (category) => {
    console.log('🔧 Category filter changed to:', category);
    console.log('🔧 Previous category was:', selectedCategory);
    console.log('🔧 Available categories:', availableCategories);
    setSelectedCategory(category);
  };

  const clearFilters = () => {
    console.log('🧹 Clearing category filter');
    setSelectedCategory('');
  };

  // Process data for charts with safety checks - using actual API field names
  const competitorChartData = Array.isArray(competitors) ? competitors.slice(0, 10).map(competitor => ({
    name: competitor.company_name?.length > 15 ? 
      competitor.company_name.substring(0, 15) + '...' : 
      competitor.company_name,
    products: competitor.total_products || 0,
    score: competitor.average_score || 0,
    fullName: competitor.company_name
  })) : [];

  // Convert category breakdown object to array for pie chart
  const categoryPieData = categoryBreakdown && typeof categoryBreakdown === 'object' ? 
    Object.entries(categoryBreakdown).map(([category, data], index) => ({
      name: category,
      value: data.competitor_count || 0,
      color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F97316'][index % 6]
    })) : [];

  // Debug logging for chart data
  console.log('📊 Chart Data Debug:', {
    competitorsArray: Array.isArray(competitors),
    competitorsLength: competitors?.length || 0,
    competitorChartDataLength: competitorChartData.length,
    categoryBreakdownArray: Array.isArray(categoryBreakdown),
    categoryBreakdownLength: categoryBreakdown?.length || 0,
    categoryPieDataLength: categoryPieData.length,
    sampleCompetitor: competitors?.[0],
    sampleCategoryBreakdown: categoryBreakdown?.[0]
  });

  return (
    <div style={{ padding: '24px 15%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', margin: 0 }}>Competitive Landscape</h2>
        
        {selectedCategory && (
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
            Clear Filter
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 16px 0' }}>Filter by Category</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              console.log('🔘 "All Categories" button clicked');
              handleCategoryChange('');
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: selectedCategory === '' ? '#2563eb' : '#f3f4f6',
              color: selectedCategory === '' ? 'white' : '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            All Categories
          </button>
          
          {Array.isArray(availableCategories) ? availableCategories.map(category => (
            <button
              key={category}
              onClick={() => {
                console.log('🔘 Category button clicked:', category);
                handleCategoryChange(category);
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: selectedCategory === category ? '#2563eb' : '#f3f4f6',
                color: selectedCategory === category ? 'white' : '#6b7280',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              {category}
            </button>
          )) : null}
        </div>
        
        {selectedCategory && (
          <div style={{ marginTop: '12px', padding: '8px 12px', backgroundColor: '#dbeafe', borderRadius: '6px', fontSize: '14px', color: '#1d4ed8' }}>
            <strong>Showing competitors in:</strong> {selectedCategory}
          </div>
        )}
      </div>

      {/* Error Display */}
      {getError('competitors') && (
        <ErrorMessage 
          error={getError('competitors')} 
          onDismiss={() => clearError('competitors')}
        />
      )}

      {/* Loading State */}
      {isLoading('competitors') && (
        <div style={{ backgroundColor: 'white', padding: '48px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
          <LoadingSpinner message="Loading competitive landscape data..." />
        </div>
      )}

      {/* Main Content */}
      {!isLoading('competitors') && !getError('competitors') && (
        <>
          {/* Market Analysis Summary */}
          {marketAnalysis && (
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>Market Analysis Summary</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                <div style={{ padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0369a1' }}>
                    {marketAnalysis.total_competitors || 0}
                  </div>
                  <div style={{ fontSize: '14px', color: '#0369a1' }}>Total Competitors</div>
                </div>
                <div style={{ padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0369a1' }}>
                    {typeof marketAnalysis.average_score === 'number' ? 
                      marketAnalysis.average_score.toFixed(1) : 
                      marketAnalysis.average_score || 'N/A'}
                  </div>
                  <div style={{ fontSize: '14px', color: '#0369a1' }}>Avg Market Score</div>
                </div>
                <div style={{ padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0369a1' }}>
                    {marketAnalysis.total_competitors > 70 ? 'High' : 
                     marketAnalysis.total_competitors > 40 ? 'Medium' : 'Low'}
                  </div>
                  <div style={{ fontSize: '14px', color: '#0369a1' }}>Market Saturation</div>
                </div>
                <div style={{ padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0369a1' }}>
                    {typeof marketAnalysis.average_growth === 'number' ? 
                      (marketAnalysis.average_growth > 8 ? 'High' : 
                       marketAnalysis.average_growth > 5 ? 'Medium' : 'Low') : 'Medium'}
                  </div>
                  <div style={{ fontSize: '14px', color: '#0369a1' }}>Growth Opportunity</div>
                </div>
              </div>
            </div>
          )}

          {/* Charts Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
            {/* Top Competitors Chart */}
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>Top Competitors by Market Score</h3>
              {competitorChartData.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#6b7280', padding: '48px' }}>
                  No competitor data available for the selected filters.
                </div>
              ) : (
                <div style={{ width: '100%', height: '300px' }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={competitorChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        fontSize={12}
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => {
                          if (name === 'score') return [value, 'Market Score'];
                          if (name === 'products') return [value, 'Product Count'];
                          return [value, name];
                        }}
                        labelFormatter={(label, payload) => {
                          const data = payload?.[0]?.payload;
                          return data?.fullName || label;
                        }}
                      />
                      <Bar dataKey="score" fill="#3B82F6" name="Market Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Category Distribution */}
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>Category Distribution</h3>
              {categoryPieData.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#6b7280', padding: '48px' }}>
                  No category data available.
                </div>
              ) : (
                <div style={{ width: '100%', height: '250px' }}>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={categoryPieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({name, value}) => `${name}: ${value}`}
                        labelLine={false}
                      >
                        {categoryPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}`, 'Competitors']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>

          {/* Competitors Table */}
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>Detailed Competitor Analysis</h3>
            {competitors.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#6b7280', padding: '48px' }}>
                No competitors found for the selected filters.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600', color: '#374151' }}>Company</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600', color: '#374151' }}>Category</th>
                      <th style={{ textAlign: 'center', padding: '12px', fontWeight: '600', color: '#374151' }}>Products</th>
                      <th style={{ textAlign: 'center', padding: '12px', fontWeight: '600', color: '#374151' }}>Market Score</th>
                      <th style={{ textAlign: 'center', padding: '12px', fontWeight: '600', color: '#374151' }}>Growth Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(competitors) ? competitors.map((competitor, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px', fontWeight: '500' }}>
                          {competitor.company_name || 'Unknown Company'}
                        </td>
                        <td style={{ padding: '12px', color: '#6b7280' }}>
                          {competitor.primary_category || 'N/A'}
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          {competitor.total_products || 0}
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '600',
                            backgroundColor: 
                              (competitor.average_score || 0) >= 80 ? '#dcfce7' : 
                              (competitor.average_score || 0) >= 60 ? '#fef3c7' : '#fee2e2',
                            color: 
                              (competitor.average_score || 0) >= 80 ? '#166534' : 
                              (competitor.average_score || 0) >= 60 ? '#92400e' : '#dc2626'
                          }}>
                            {competitor.average_score || 'N/A'}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <span style={{
                            color: String(competitor.growth_trend || '').startsWith('+') ? '#10b981' : 
                                   String(competitor.growth_trend || '').startsWith('-') ? '#ef4444' : '#6b7280',
                            fontWeight: '500'
                          }}>
                            {competitor.growth_trend || 'N/A'}
                          </span>
                        </td>
                      </tr>
                    )) : null}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Competitors;
