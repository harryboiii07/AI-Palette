import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../../context/AppContext';
import MetricsCard from './MetricsCard';
import RecentActivity from './RecentActivity';

const Dashboard = () => {
  const { dashboardData, productsData, setCurrentScreen } = useAppContext();

  const trendData = [
    { month: 'Jan', beverages: 65, snacks: 45, dairy: 30 },
    { month: 'Feb', beverages: 70, snacks: 50, dairy: 35 },
    { month: 'Mar', beverages: 75, snacks: 55, dairy: 40 },
    { month: 'Apr', beverages: 80, snacks: 60, dairy: 45 },
  ];

  const handleViewAllProducts = () => {
    setCurrentScreen('analysis');
  };

  return (
    <div style={{ padding: '24px 15%' }}>
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
