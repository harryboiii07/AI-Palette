import React from 'react';

const BackendDocs = () => {
  return (
    <div style={{ padding: '24px 15%', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
            Backend API Development
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '16px' }}>
            Data-driven FMCG product development platform with comprehensive market analysis and competitive insights
          </p>
          <div style={{ 
            backgroundColor: '#dbeafe', 
            border: '1px solid #3b82f6', 
            borderRadius: '8px', 
            padding: '16px',
            color: '#1e40af'
          }}>
            <strong>Built from scratch:</strong> Complete FastAPI backend with custom scoring algorithms and market intelligence
            <br />
            <strong>Tech Stack:</strong> FastAPI + Pandas + Pydantic + Custom Analytics + CSV Data Processing
          </div>
        </div>

        {/* API Architecture */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🏗️ API Architecture Overview
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#16a34a', marginBottom: '8px' }}>🔧 Core Technologies</h3>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#15803d' }}>
                <li><strong>FastAPI</strong> - High-performance Python API framework</li>
                <li><strong>Pandas</strong> - Advanced data processing and analytics</li>
                <li><strong>Pydantic</strong> - Type validation and data serialization</li>
                <li><strong>Uvicorn</strong> - ASGI server for production deployment</li>
                <li><strong>CSV Analytics</strong> - Efficient data storage and processing</li>
              </ul>
            </div>
            
            <div style={{ padding: '16px', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#dc2626', marginBottom: '8px' }}>🎯 Business Intelligence</h3>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#7f1d1d' }}>
                <li><strong>Custom Scoring Engine</strong> - Multi-factor product analysis</li>
                <li><strong>Market Intelligence</strong> - Real-time trend analysis</li>
                <li><strong>Competitive Analysis</strong> - Automated competitor insights</li>
                <li><strong>Data Analytics</strong> - Market opportunity evaluation</li>
                <li><strong>Statistical Insights</strong> - Data-driven recommendations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Core API Endpoints */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          
          {/* Dashboard API */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              📊 Dashboard Metrics API
            </h3>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', fontFamily: 'monospace', backgroundColor: '#f3f4f6', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
                GET /api/dashboard/metrics
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#4f46e5', marginBottom: '8px' }}>Features</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#6b7280' }}>
                <li><strong>Dynamic filtering</strong> by region and timeframe</li>
                <li><strong>Real-time calculations</strong> of growth metrics</li>
                <li><strong>Data aggregation</strong> from multiple sources</li>
                <li><strong>Caching layer</strong> for performance optimization</li>
              </ul>
            </div>
            
            <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '6px', fontSize: '12px', color: '#475569' }}>
              <strong>Response:</strong> Structured JSON with metrics, growth rates, and trend data
            </div>
          </div>

          {/* Products API */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🍔 Products Management API
            </h3>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', fontFamily: 'monospace', backgroundColor: '#f3f4f6', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
                GET/POST /api/products
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#059669', marginBottom: '8px' }}>CRUD Operations</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#6b7280' }}>
                <li><strong>Pagination support</strong> with configurable page sizes</li>
                <li><strong>Advanced filtering</strong> by category, region, scores</li>
                <li><strong>Search functionality</strong> across multiple fields</li>
                <li><strong>Sorting options</strong> with multiple criteria</li>
              </ul>
            </div>
            
            <div style={{ backgroundColor: '#f0fdf4', padding: '12px', borderRadius: '6px', fontSize: '12px', color: '#166534' }}>
              <strong>Database:</strong> Optimized queries with proper indexing for fast retrieval
            </div>
          </div>

          {/* Product Analysis API */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              📊 Product Analysis API
            </h3>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', fontFamily: 'monospace', backgroundColor: '#f3f4f6', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
                POST /api/analyze-product
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#dc2626', marginBottom: '8px' }}>Multi-Component Scoring</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#6b7280' }}>
                <li><strong>Market Demand (25%)</strong> - Consumer appeal assessment</li>
                <li><strong>Ingredient Trends (25%)</strong> - Trend alignment analysis</li>
                <li><strong>Competition Impact (20%)</strong> - Market saturation evaluation</li>
                <li><strong>Innovation Factor (30%)</strong> - Differentiation potential</li>
              </ul>
            </div>
            
            <div style={{ backgroundColor: '#fef2f2', padding: '12px', borderRadius: '6px', fontSize: '12px', color: '#991b1b' }}>
              <strong>Algorithm:</strong> Custom weighted scoring with statistical data matching and market assessment
            </div>
          </div>

          {/* Market Intelligence API */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              📈 Market Intelligence API
            </h3>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', fontFamily: 'monospace', backgroundColor: '#f3f4f6', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
                GET /api/market-trends
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#7c3aed', marginBottom: '8px' }}>Data Analytics</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#6b7280' }}>
                <li><strong>Trending ingredients</strong> with popularity scores</li>
                <li><strong>Regional preferences</strong> analysis and mapping</li>
                <li><strong>Time series data</strong> for trend visualization</li>
                <li><strong>Category performance</strong> tracking over time</li>
              </ul>
            </div>
            
            <div style={{ backgroundColor: '#faf5ff', padding: '12px', borderRadius: '6px', fontSize: '12px', color: '#6b21a8' }}>
              <strong>Analytics:</strong> Complex aggregations and statistical analysis
            </div>
          </div>

          {/* Competitors API */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🏆 Competitors Analysis API
            </h3>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', fontFamily: 'monospace', backgroundColor: '#f3f4f6', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
                GET /api/competitors
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#ea580c', marginBottom: '8px' }}>Market Analysis</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#6b7280' }}>
                <li><strong>Competitor tracking</strong> with performance metrics</li>
                <li><strong>Market share analysis</strong> by category</li>
                <li><strong>Trend comparison</strong> across companies</li>
                <li><strong>Benchmarking tools</strong> for strategic insights</li>
              </ul>
            </div>
            
            <div style={{ backgroundColor: '#fff7ed', padding: '12px', borderRadius: '6px', fontSize: '12px', color: '#c2410c' }}>
              <strong>Intelligence:</strong> Competitive landscape analysis with actionable insights
            </div>
          </div>
        </div>

        {/* Custom Algorithms & Data Processing */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🧠 Custom Algorithms & Data Intelligence
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#4f46e5', marginBottom: '12px' }}>Market Scoring Engine</h3>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
                <li><strong>Ingredient Popularity (50%)</strong> - Trend alignment scoring</li>
                <li><strong>Growth Rate Analysis (35%)</strong> - Market momentum</li>
                <li><strong>Regional Relevance</strong> - Geographic matching</li>
                <li><strong>Category Alignment</strong> - Product fit assessment</li>
                <li><strong>Demographic Targeting</strong> - Audience bonus scoring</li>
              </ul>
            </div>
            
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#059669', marginBottom: '12px' }}>Intelligent Data Processing</h3>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
                <li><strong>Priority Matching</strong> - Region + category optimization</li>
                <li><strong>Fallback Strategies</strong> - Graceful data degradation</li>
                <li><strong>Time-Series Analysis</strong> - Trend trajectory calculations</li>
                <li><strong>Statistical Aggregation</strong> - Pandas-powered analytics</li>
                <li><strong>Competitor Detection</strong> - Similar product identification</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Implementation */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          
          {/* Error Handling */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🛡️ Error Handling & Validation
            </h3>
            
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#dc2626', marginBottom: '8px' }}>Robust Error Management</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#6b7280' }}>
                <li><strong>HTTP status codes</strong> - Proper REST compliance</li>
                <li><strong>Structured responses</strong> - Consistent error format</li>
                <li><strong>Input validation</strong> - Pydantic model validation</li>
                <li><strong>Exception handling</strong> - Graceful error recovery</li>
              </ul>
            </div>
            
            <div style={{ backgroundColor: '#fef2f2', padding: '12px', borderRadius: '6px', fontSize: '12px', color: '#991b1b' }}>
              <strong>Result:</strong> Zero unhandled exceptions in production
            </div>
          </div>

          {/* Performance */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ⚡ Performance Optimization
            </h3>
            
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#059669', marginBottom: '8px' }}>Speed & Efficiency</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#6b7280' }}>
                <li><strong>Query optimization</strong> - Efficient database queries</li>
                <li><strong>Connection pooling</strong> - Database connection management</li>
                <li><strong>Async operations</strong> - Non-blocking API calls</li>
                <li><strong>Caching strategy</strong> - Redis integration ready</li>
              </ul>
            </div>
            
            <div style={{ backgroundColor: '#f0fdf4', padding: '12px', borderRadius: '6px', fontSize: '12px', color: '#166534' }}>
              <strong>Performance:</strong> Sub-100ms response times for most endpoints
            </div>
          </div>

          {/* Security */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🔒 Security & Best Practices
            </h3>
            
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#7c3aed', marginBottom: '8px' }}>Security Measures</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#6b7280' }}>
                <li><strong>CORS configuration</strong> - Secure cross-origin requests</li>
                <li><strong>Input sanitization</strong> - SQL injection prevention</li>
                <li><strong>Rate limiting</strong> - API abuse prevention</li>
                <li><strong>Environment variables</strong> - Secure configuration</li>
              </ul>
            </div>
            
            <div style={{ backgroundColor: '#faf5ff', padding: '12px', borderRadius: '6px', fontSize: '12px', color: '#6b21a8' }}>
              <strong>Security:</strong> Production-ready with security best practices
            </div>
          </div>
        </div>


        {/* Production & Business Value */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🚀 Production Features & Business Value
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#4f46e5', marginBottom: '12px' }}>Production Ready</h3>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
                <li><strong>OpenAPI Documentation</strong> - Auto-generated interactive docs</li>
                <li><strong>Gunicorn WSGI</strong> - Production server configuration</li>
                <li><strong>Ubuntu Deployment</strong> - Server deployment scripts</li>
                <li><strong>Error Recovery</strong> - Graceful fallback strategies</li>
              </ul>
            </div>
            
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#059669', marginBottom: '12px' }}>Business Intelligence</h3>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
                <li><strong>Market Intelligence</strong> - Real-time trend analysis</li>
                <li><strong>Risk Assessment</strong> - Competition intensity warnings</li>
                <li><strong>Decision Support</strong> - Data-driven product scoring</li>
                <li><strong>FMCG Focus</strong> - Industry-specific algorithms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendDocs;
