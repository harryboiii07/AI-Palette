// App.js
import React, { useState } from 'react';
import './App.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Plus, TrendingUp, Package, Users, Search, Filter, Download, Edit, Eye, ArrowRight, Globe, Target, Lightbulb } from 'lucide-react';


function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Sample data
  const trendData = [
    { month: 'Jan', beverages: 65, snacks: 45, dairy: 30 },
    { month: 'Feb', beverages: 70, snacks: 50, dairy: 35 },
    { month: 'Mar', beverages: 75, snacks: 55, dairy: 40 },
    { month: 'Apr', beverages: 80, snacks: 60, dairy: 45 },
  ];

  const ingredientData = [
    { name: 'Turmeric', value: 85, growth: '+12%' },
    { name: 'Green Tea', value: 78, growth: '+8%' },
    { name: 'Coconut', value: 72, growth: '+15%' },
    { name: 'Quinoa', value: 68, growth: '+6%' },
  ];

  const products = [
    { id: 1, name: 'Spiced Turmeric Latte', category: 'Beverages', score: 92, status: 'Active', created: '2024-08-01' },
    { id: 2, name: 'Coconut Quinoa Bites', category: 'Snacks', score: 87, status: 'Testing', created: '2024-07-28' },
    { id: 3, name: 'Green Tea Yogurt', category: 'Dairy', score: 94, status: 'Active', created: '2024-07-25' },
  ];

  // Static data that should come from backend APIs
  const dashboardData = {
    totalProducts: 247,
    successRate: 87,
    activeUsers: 1432,
    trendingCategories: 5,
    growthMetrics: {
      productsGrowth: 12,
      successRateGrowth: 3,
      usersGrowth: 8
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

  const renderNavigation = () => (
    <nav style={{
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      borderBottom: '1px solid #e5e7eb',
      padding: '16px 15%'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb', margin: 0 }}>FlavorForge</h1>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['dashboard', 'creator', 'analysis', 'intelligence'].map(screen => (
              <button
                key={screen}
                onClick={() => setCurrentScreen(screen)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: currentScreen === screen ? '#dbeafe' : 'transparent',
                  color: currentScreen === screen ? '#2563eb' : '#6b7280',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {screen === 'creator' ? 'Create Product' :
                  screen === 'analysis' ? 'Product Analysis' :
                    screen === 'intelligence' ? 'Market Intelligence' :
                      'Dashboard'}
              </button>
            ))}
          </div>
        </div>
        <button style={{
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer'
        }}>
          + New Product
        </button>
      </div>
    </nav>
  );

  const renderDashboard = () => (
    <div style={{ padding: '24px 15%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 8px 0' }}>Total Products</p>
              <p style={{ fontSize: '30px', fontWeight: 'bold', margin: '0 0 8px 0' }}>{dashboardData.totalProducts}</p>
            </div>
            <div style={{ width: '24px', height: '24px', backgroundColor: '#2563eb', borderRadius: '4px' }}></div>
          </div>
          <p style={{ color: '#10b981', fontSize: '14px', margin: 0 }}>+{dashboardData.growthMetrics.productsGrowth}% from last month</p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 8px 0' }}>Success Rate</p>
              <p style={{ fontSize: '30px', fontWeight: 'bold', margin: '0 0 8px 0' }}>{dashboardData.successRate}%</p>
            </div>
            <div style={{ width: '24px', height: '24px', backgroundColor: '#10b981', borderRadius: '4px' }}></div>
          </div>
          <p style={{ color: '#10b981', fontSize: '14px', margin: 0 }}>+{dashboardData.growthMetrics.successRateGrowth}% from last month</p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 8px 0' }}>Active Users</p>
              <p style={{ fontSize: '30px', fontWeight: 'bold', margin: '0 0 8px 0' }}>{dashboardData.activeUsers.toLocaleString()}</p>
            </div>
            <div style={{ width: '24px', height: '24px', backgroundColor: '#8b5cf6', borderRadius: '4px' }}></div>
          </div>
          <p style={{ color: '#10b981', fontSize: '14px', margin: 0 }}>+{dashboardData.growthMetrics.usersGrowth}% from last month</p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 8px 0' }}>Trending Categories</p>
              <p style={{ fontSize: '30px', fontWeight: 'bold', margin: '0 0 8px 0' }}>{dashboardData.trendingCategories}</p>
            </div>
            <div style={{ width: '24px', height: '24px', backgroundColor: '#f59e0b', borderRadius: '4px' }}></div>
          </div>
          <p style={{ color: '#10b981', fontSize: '14px', margin: 0 }}>Beverages leading</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>Market Trends</h3>
          <div style={{ width: '100%', height: '250px', backgroundColor: '#f9fafb', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* <p style={{ color: '#6b7280' }}>Bar Chart: {dashboardData.chartData.map(d => d.month).join(', ')}</p> */}
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

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {productsData.slice(0, 3).map(product => (
              <div key={product.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                <div>
                  <p style={{ fontWeight: '500', margin: '0 0 4px 0' }}>{product.name}</p>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{product.category} • Score: {product.score}</p>
                </div>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: product.status === 'Active' ? '#dcfce7' : '#fef3c7',
                  color: product.status === 'Active' ? '#166534' : '#92400e'
                }}>
                  {product.status}
                </span>
              </div>
            ))}
          </div>
          <button style={{ width: '100%', marginTop: '16px', color: '#2563eb', fontSize: '14px', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}>
            View All Products
          </button>
        </div>
      </div>
    </div>
  );

  const renderProductCreator = () => (
    <div style={{ padding: '24px 15%' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Create New Product</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {[1, 2, 3, 4].map(step => (
                  <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: step <= currentStep ? '#2563eb' : '#e5e7eb',
                      color: step <= currentStep ? 'white' : '#6b7280'
                    }}>
                      {step}
                    </div>
                    {step < 4 && <div style={{ width: '48px', height: '1px', backgroundColor: step < currentStep ? '#2563eb' : '#e5e7eb' }} />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding: '24px' }}>
            {currentStep === 1 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0' }}>Select Product Category</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  {['Beverages', 'Snacks', 'Dairy', 'Cereals', 'Frozen Foods', 'Confectionery'].map(category => (
                    <button key={category} style={{
                      padding: '16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#6b7280', margin: '0 auto 8px', borderRadius: '4px' }}></div>
                      <p style={{ fontWeight: '500', margin: 0 }}>{category}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0' }}>Target Demographics</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Age Group</label>
                    <select style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }}>
                      <option>18-25</option>
                      <option>26-35</option>
                      <option>36-45</option>
                      <option>46-60</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Region</label>
                    <select style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }}>
                      <option>North America</option>
                      <option>Europe</option>
                      <option>Asia Pacific</option>
                      <option>Latin America</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0' }}>Flavor Preferences</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  {['Sweet', 'Spicy', 'Salty', 'Sour', 'Bitter', 'Umami', 'Fruity', 'Herbal'].map(flavor => (
                    <label key={flavor} style={{ display: 'flex', alignItems: 'center', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                      <input type="checkbox" style={{ marginRight: '12px' }} />
                      <span>{flavor}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0' }}>AI Generated Suggestions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {aiSuggestions.map((suggestion, idx) => (
                    <div key={idx} style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <h4 style={{ fontWeight: '500', margin: 0 }}>{suggestion.name}</h4>
                        <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '12px', fontSize: '14px' }}>
                          Score: {suggestion.score}
                        </span>
                      </div>
                      <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 12px 0' }}>{suggestion.description}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <span style={{ backgroundColor: '#dbeafe', color: '#1d4ed8', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>High Demand</span>
                          <span style={{ backgroundColor: '#e9d5ff', color: '#7c3aed', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>Trending</span>
                        </div>
                        <button style={{ color: '#2563eb', fontSize: '14px', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}>
                          Select This Concept
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                style={{
                  padding: '8px 24px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentStep === 1 ? 0.5 : 1
                }}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                style={{
                  padding: '8px 24px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {currentStep === 4 ? 'Create Product' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProductAnalysis = () => (
    <div style={{ padding: '24px 15%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', margin: 0 }}>Product Analysis</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              width: '256px'
            }}
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px'
            }}
          >
            <option value="">All Categories</option>
            <option value="Beverages">Beverages</option>
            <option value="Snacks">Snacks</option>
            <option value="Dairy">Dairy</option>
            <option value="Cereals">Cereals</option>
            <option value="Confectionery">Confectionery</option>
          </select>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#2563eb',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer'
          }}>
            Export
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Product</th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Category</th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Market Score</th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Created</th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '500' }}>{product.name}</div>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '14px' }}>{product.category}</td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', marginRight: '8px' }}>{product.score}</div>
                    <div style={{ width: '64px', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}>
                      <div style={{
                        width: `${product.score}%`,
                        height: '8px',
                        backgroundColor: '#10b981',
                        borderRadius: '4px'
                      }}></div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: product.status === 'Active' ? '#dcfce7' : '#fef3c7',
                    color: product.status === 'Active' ? '#166534' : '#92400e'
                  }}>
                    {product.status}
                  </span>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '14px' }}>{product.created}</td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer' }}>View</button>
                    <button style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}>Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '24px', backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>Product Performance Comparison</h3>
        <div style={{ width: '100%', height: '300px', backgroundColor: '#f9fafb', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* <p style={{ color: '#6b7280' }}>Line Chart: Product performance over time</p> */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[
              { month: 'Jan', product1: 65, product2: 45, product3: 70 },
              { month: 'Feb', product1: 70, product2: 52, product3: 75 },
              { month: 'Mar', product1: 75, product2: 58, product3: 80 },
              { month: 'Apr', product1: 80, product2: 65, product3: 85 },
            ]}>
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
    </div>
  );

  const renderMarketIntelligence = () => (
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
            {/* <p style={{ color: '#6b7280' }}>Pie Chart: Regional distribution</p> */}
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'North America', value: 35, color: '#3B82F6' },
                    { name: 'Europe', value: 28, color: '#10B981' },
                    { name: 'Asia Pacific', value: 25, color: '#F59E0B' },
                    { name: 'Others', value: 12, color: '#EF4444' }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {[
                    { name: 'North America', value: 35, color: '#3B82F6' },
                    { name: 'Europe', value: 28, color: '#10B981' },
                    { name: 'Asia Pacific', value: 25, color: '#F59E0B' },
                    { name: 'Others', value: 12, color: '#EF4444' }
                  ].map((entry, index) => (
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
          {/* <p style={{ color: '#6b7280' }}>Line Chart: Healthy, Organic, Plant-Based, Functional Foods trends</p> */}
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={[
              { month: 'Jan', healthy: 65, organic: 45, plantBased: 30, functional: 25 },
              { month: 'Feb', healthy: 70, organic: 50, plantBased: 35, functional: 30 },
              { month: 'Mar', healthy: 75, organic: 55, plantBased: 40, functional: 35 },
              { month: 'Apr', healthy: 80, organic: 60, plantBased: 45, functional: 40 },
              { month: 'May', healthy: 78, organic: 65, plantBased: 50, functional: 45 },
              { month: 'Jun', healthy: 85, organic: 70, plantBased: 55, functional: 50 },
            ]}>
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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {renderNavigation()}

      {currentScreen === 'dashboard' && renderDashboard()}
      {currentScreen === 'creator' && renderProductCreator()}
      {currentScreen === 'analysis' && renderProductAnalysis()}
      {currentScreen === 'intelligence' && renderMarketIntelligence()}

      <div style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 8px 0' }}>Current Screen:</p>
        <p style={{ fontWeight: '500', margin: 0, textTransform: 'capitalize' }}>
          {currentScreen === 'creator' ? 'Create Product' :
            currentScreen === 'analysis' ? 'Product Analysis' :
              currentScreen === 'intelligence' ? 'Market Intelligence' :
                'Dashboard'}
        </p>
      </div>
    </div>
  );
}

export default App;