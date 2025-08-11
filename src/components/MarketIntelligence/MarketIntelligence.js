import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAppContext } from '../../context/AppContext';

const MarketIntelligence = () => {
  const { trendsData, competitorsData } = useAppContext();

  const timelineData = [
    { month: 'Jan', healthy: 65, organic: 45, plantBased: 30, functional: 25 },
    { month: 'Feb', healthy: 70, organic: 50, plantBased: 35, functional: 30 },
    { month: 'Mar', healthy: 75, organic: 55, plantBased: 40, functional: 35 },
    { month: 'Apr', healthy: 80, organic: 60, plantBased: 45, functional: 40 },
    { month: 'May', healthy: 78, organic: 65, plantBased: 50, functional: 45 },
    { month: 'Jun', healthy: 85, organic: 70, plantBased: 55, functional: 50 },
  ];

  const regionalPieData = [
    { name: 'North America', value: 35, color: '#3B82F6' },
    { name: 'Europe', value: 28, color: '#10B981' },
    { name: 'Asia Pacific', value: 25, color: '#F59E0B' },
    { name: 'Others', value: 12, color: '#EF4444' }
  ];

  return (
    <div style={{ padding: '24px 15%' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '600', margin: '0 0 24px 0' }}>Market Intelligence</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>Trending Ingredients</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {trendsData.trendingIngredients.map((ingredient, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div>
                  <span style={{ fontWeight: '500' }}>{ingredient.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: '500' }}>{ingredient.score}</div>
                    <div style={{ width: '80px', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}>
                      <div style={{
                        width: `${ingredient.score}%`,
                        height: '8px',
                        backgroundColor: '#2563eb',
                        borderRadius: '4px'
                      }}></div>
                    </div>
                  </div>
                  <span style={{ color: '#10b981', fontSize: '14px', fontWeight: '500' }}>{ingredient.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>Regional Preferences</h3>
          <div style={{ width: '100%', height: '200px', backgroundColor: '#f9fafb', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={regionalPieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {regionalPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>Market Trends Over Time</h3>
        <div style={{ width: '100%', height: '350px', backgroundColor: '#f9fafb', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="healthy" stroke="#3B82F6" strokeWidth={2} name="Healthy Foods" />
              <Line type="monotone" dataKey="organic" stroke="#10B981" strokeWidth={2} name="Organic" />
              <Line type="monotone" dataKey="plantBased" stroke="#F59E0B" strokeWidth={2} name="Plant-Based" />
              <Line type="monotone" dataKey="functional" stroke="#EF4444" strokeWidth={2} name="Functional Foods" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

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
    </div>
  );
};

export default MarketIntelligence;
