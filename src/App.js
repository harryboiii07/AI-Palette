// App.js
import React, { useEffect } from 'react';
import './App.css';
import { AppProvider, useAppContext } from './context/AppContext';
import Navigation from './components/Navigation/Navigation';
import Dashboard from './components/Dashboard/Dashboard';
import ProductCreator from './components/ProductCreator/ProductCreator';
import ProductAnalysis from './components/ProductAnalysis/ProductAnalysis';
import MarketIntelligence from './components/MarketIntelligence/MarketIntelligence';
import { initializeAPI } from './services/api';

const AppContent = () => {
  const context = useAppContext();
  const { currentScreen } = context;

  // Initialize API with context for global loading/error handling
  useEffect(() => {
    initializeAPI(context);
  }, [context]);

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard />;
      case 'creator':
        return <ProductCreator />;
      case 'analysis':
        return <ProductAnalysis />;
      case 'intelligence':
        return <MarketIntelligence />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Navigation />
      {renderCurrentScreen()}
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
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;