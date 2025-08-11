import React from 'react';

const ErrorMessage = ({ 
  error, 
  onDismiss, 
  type = 'error',
  showIcon = true 
}) => {
  if (!error) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return {
          backgroundColor: '#fef3c7',
          borderColor: '#f59e0b',
          color: '#92400e',
          iconColor: '#f59e0b'
        };
      case 'info':
        return {
          backgroundColor: '#dbeafe',
          borderColor: '#3b82f6',
          color: '#1e40af',
          iconColor: '#3b82f6'
        };
      default:
        return {
          backgroundColor: '#fef2f2',
          borderColor: '#ef4444',
          color: '#dc2626',
          iconColor: '#ef4444'
        };
    }
  };

  const styles = getTypeStyles();

  const containerStyle = {
    padding: '12px 16px',
    backgroundColor: styles.backgroundColor,
    border: `1px solid ${styles.borderColor}`,
    borderRadius: '8px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px'
  };

  const iconStyle = {
    color: styles.iconColor,
    fontSize: '16px',
    marginTop: '2px',
    flexShrink: 0
  };

  const messageStyle = {
    color: styles.color,
    fontSize: '14px',
    margin: 0,
    flex: 1,
    lineHeight: '1.4'
  };

  const dismissButtonStyle = {
    background: 'none',
    border: 'none',
    color: styles.color,
    cursor: 'pointer',
    fontSize: '18px',
    padding: '0',
    marginLeft: '8px',
    flexShrink: 0
  };

  const getIcon = () => {
    switch (type) {
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '❌';
    }
  };

  return (
    <div style={containerStyle}>
      {showIcon && <span style={iconStyle}>{getIcon()}</span>}
      <p style={messageStyle}>
        {typeof error === 'string' ? error : error.message || 'An error occurred'}
      </p>
      {onDismiss && (
        <button 
          style={dismissButtonStyle}
          onClick={onDismiss}
          aria-label="Dismiss error"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
