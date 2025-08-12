import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';

const Navigation = () => {
  const { currentScreen, setCurrentScreen } = useAppContext();
  const [showDocsDropdown, setShowDocsDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDocsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
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
            {['dashboard', 'creator', 'analysis', 'intelligence', 'competitors'].map(screen => (
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
                      screen === 'competitors' ? 'Competitors' :
                        'Dashboard'}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Developer Docs Dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setShowDocsDropdown(!showDocsDropdown)}
              style={{
                backgroundColor: '#f3f4f6',
                color: '#374151',
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Developer Docs
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{
                  transform: showDocsDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s'
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showDocsDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '4px',
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                minWidth: '160px',
                zIndex: 1000
              }}>
                <button
                  onClick={() => {
                    setCurrentScreen('frontend-docs');
                    setShowDocsDropdown(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: 'none',
                    backgroundColor: currentScreen === 'frontend-docs' ? '#f3f4f6' : 'transparent',
                    color: currentScreen === 'frontend-docs' ? '#2563eb' : '#374151',
                    cursor: 'pointer',
                    textAlign: 'left',
                    borderRadius: '8px 8px 0 0',
                    fontSize: '14px'
                  }}
                >
                  Frontend Enhancements
                </button>
                <button
                  onClick={() => {
                    setCurrentScreen('backend-docs');
                    setShowDocsDropdown(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: 'none',
                    backgroundColor: currentScreen === 'backend-docs' ? '#f3f4f6' : 'transparent',
                    color: currentScreen === 'backend-docs' ? '#2563eb' : '#374151',
                    cursor: 'pointer',
                    textAlign: 'left',
                    borderRadius: '0 0 8px 8px',
                    fontSize: '14px'
                  }}
                >
                  Backend Enhancements
                </button>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setCurrentScreen('creator')}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            + New Product
          </button>
        </div>
      </div>

    </nav>
  );
};

export default Navigation;
