import React, { useEffect, useState, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../../context/AppContext';
import MetricsCard from './MetricsCard';
import RecentActivity from './RecentActivity';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { dashboardAPI } from '../../services/api';

const Dashboard = () => {
  const {
    productsData,
    setCurrentScreen
  } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    successRate: 0,
    activeUsers: 0,
    trendingCategories: 0,
    growthMetrics: {
      productsGrowth: 0,
      successRateGrowth: 0,
      usersGrowth: 0,
      categoriesGrowth: 0
    }
  });

  // Use ref to track current data without causing re-renders
  const currentDataRef = useRef(null);

  // Filters state
  const [filters, setFilters] = useState({
    region: 'Global',
    timeframe: '30d'
  });

  // Local loading and error state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const trendData = [
    { month: 'Jan', beverages: 65, snacks: 45, dairy: 30 },
    { month: 'Feb', beverages: 70, snacks: 50, dairy: 35 },
    { month: 'Mar', beverages: 75, snacks: 55, dairy: 40 },
    { month: 'Apr', beverages: 80, snacks: 60, dairy: 45 },
  ];

  // Load dashboard data when filters change - COMPLETELY ISOLATED
  useEffect(() => {
    const loadDashboardData = async () => {
      console.log('Loading dashboard data with filters:', filters);
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await dashboardAPI.getMetrics(filters);
        
        if (response.success && response.data) {
          const newData = {
            totalProducts: response.data.total_products || 0,
            successRate: response.data.success_rate || 0,
            activeUsers: response.data.active_users || 0,
            trendingCategories: response.data.trending_categories || 0,
            growthMetrics: {
              productsGrowth: response.data.growth_metrics?.products_growth || 0,
              successRateGrowth: response.data.growth_metrics?.success_rate_growth || 0,
              usersGrowth: response.data.growth_metrics?.users_growth || 0,
              categoriesGrowth: response.data.growth_metrics?.categories_growth || 0
            }
          };
          
          setDashboardData(newData);
          currentDataRef.current = newData;
          console.log('Dashboard data loaded successfully');
        } else {
          throw new Error('Invalid response format from server');
        }
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        setError(`Failed to load dashboard data: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [filters]); // Only depends on filters

  const handleViewAllProducts = () => {
    setCurrentScreen('analysis');
  };

    if (isLoading) {
    return (
      <div style={{ padding: '24px 15%' }}>
        <LoadingSpinner
          size="large"
          message="Loading dashboard data..."
        />
      </div>
    );
  }

  return (
          <div style={{ padding: '24px 15%' }}>
        {/* Dashboard Filters */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', margin: '0 0 16px 0' }}>
            Dashboard Filters
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {/* Region Filter */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Region
              </label>
              <select
                value={filters.region}
                onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  outline: 'none'
                }}
              >
                <option value="Global">Global</option>
                <option value="North America">North America</option>
                <option value="Europe">Europe</option>
                <option value="Asia Pacific">Asia Pacific</option>
                <option value="Latin America">Latin America</option>
                <option value="Africa">Africa</option>
              </select>
            </div>

            {/* Timeframe Filter */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Timeframe
              </label>
              <select
                value={filters.timeframe}
                onChange={(e) => setFilters({ ...filters, timeframe: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  outline: 'none'
                }}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>

            {/* Current Selection Display */}
            <div style={{ display: 'flex', alignItems: 'end' }}>
              <div style={{
                padding: '8px 12px',
                backgroundColor: '#f3f4f6',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#6b7280'
              }}>
                Showing: {filters.region} • {filters.timeframe}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <ErrorMessage
            error={error}
            onDismiss={() => setError(null)}
          />
        )}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
        <MetricsCard
          title="Total Products"
          value={dashboardData.totalProducts}
          growthPercentage={dashboardData.growthMetrics.productsGrowth}
          color="#2563eb"
        />
        <MetricsCard
          title="Success Rate"
          value={dashboardData.successRate}
          growthPercentage={dashboardData.growthMetrics.successRateGrowth}
          color="#10b981"
        />
        <MetricsCard
          title="Active Users"
          value={dashboardData.activeUsers}
          growthPercentage={dashboardData.growthMetrics.usersGrowth}
          color="#8b5cf6"
        />
        <MetricsCard
          title="Trending Categories"
          value={dashboardData.trendingCategories}
          color="#f59e0b"
          subtitle="Beverages leading"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>Market Trends</h3>
          <div style={{ width: '100%', height: '250px', backgroundColor: '#f9fafb', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="beverages" fill="#3B82F6" />
                <Bar dataKey="snacks" fill="#10B981" />
                <Bar dataKey="dairy" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <RecentActivity 
          products={productsData} 
          onViewAll={handleViewAllProducts}
        />
      </div>
    </div>
  );
};

export default Dashboard;
