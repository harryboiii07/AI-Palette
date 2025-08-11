import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  message = 'Loading...', 
  overlay = false,
  color = '#2563eb' 
}) => {
  const sizes = {
    small: '16px',
    medium: '24px',
    large: '32px'
  };

  const spinnerStyle = {
    width: sizes[size],
    height: sizes[size],
    border: `2px solid #f3f3f3`,
    borderTop: `2px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    ...(overlay && {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      zIndex: 1000
    })
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={containerStyle}>
        <div style={spinnerStyle}></div>
        {message && (
          <p style={{ 
            fontSize: '14px', 
            color: '#6b7280', 
            margin: 0,
            textAlign: 'center'
          }}>
            {message}
          </p>
        )}
      </div>
    </>
  );
};

export default LoadingSpinner;
