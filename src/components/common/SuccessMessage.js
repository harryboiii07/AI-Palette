import React from 'react';

const SuccessMessage = ({ 
  message, 
  onDismiss, 
  autoHide = true,
  showIcon = true 
}) => {
  if (!message) return null;

  const containerStyle = {
    padding: '12px 16px',
    backgroundColor: '#dcfce7',
    border: '1px solid #10b981',
    borderRadius: '8px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px'
  };

  const iconStyle = {
    color: '#10b981',
    fontSize: '16px',
    marginTop: '2px',
    flexShrink: 0
  };

  const messageStyle = {
    color: '#166534',
    fontSize: '14px',
    margin: 0,
    flex: 1,
    lineHeight: '1.4'
  };

  const dismissButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#166534',
    cursor: 'pointer',
    fontSize: '18px',
    padding: '0',
    marginLeft: '8px',
    flexShrink: 0
  };

  return (
    <div style={containerStyle}>
      {showIcon && <span style={iconStyle}>✅</span>}
      <p style={messageStyle}>
        {typeof message === 'string' ? message : message.message || 'Success!'}
      </p>
      {onDismiss && (
        <button 
          style={dismissButtonStyle}
          onClick={onDismiss}
          aria-label="Dismiss success message"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SuccessMessage;
