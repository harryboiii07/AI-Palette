import React from 'react';
import { useAppContext } from '../../context/AppContext';

const Navigation = () => {
  const { currentScreen, setCurrentScreen } = useAppContext();
  return (
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
};

export default Navigation;
