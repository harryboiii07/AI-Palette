import React from 'react';
import { useAppContext } from '../../context/AppContext';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';

const StateDemo = ({ isOpen, onClose }) => {
  const {
    setLoading,
    isLoading,
    setError,
    clearError,
    getError,
    setSuccess,
    clearSuccess,
    getSuccess,
    userPreferences,
    formData,
    updateFormData,
    resetForm,
    validateStep
  } = useAppContext();

  if (!isOpen) return null;

  const simulateLoading = async (key) => {
    setLoading(key, true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(key, false);
    setSuccess(key, 'Operation completed successfully!');
  };

  const simulateError = (key) => {
    setError(key, 'This is a simulated error message to test error handling.');
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const modalStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'auto',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  };

  const sectionStyle = {
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px'
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>
            Enhanced State Management Demo
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ×
          </button>
        </div>

        {/* Loading States Demo */}
        <div style={sectionStyle}>
          <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px' }}>Loading States</h3>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <button
              onClick={() => simulateLoading('demo1')}
              disabled={isLoading('demo1')}
              style={{
                padding: '8px 16px',
                backgroundColor: isLoading('demo1') ? '#9ca3af' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: isLoading('demo1') ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading('demo1') ? 'Loading...' : 'Simulate Loading'}
            </button>
            <button
              onClick={() => simulateLoading('demo2')}
              disabled={isLoading('demo2')}
              style={{
                padding: '8px 16px',
                backgroundColor: isLoading('demo2') ? '#9ca3af' : '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: isLoading('demo2') ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading('demo2') ? 'Processing...' : 'Another Loading'}
            </button>
          </div>
          {isLoading('demo1') && <LoadingSpinner message="Demo loading in progress..." />}
          {isLoading('demo2') && <LoadingSpinner size="small" message="Processing..." />}
          {getSuccess('demo1') && (
            <SuccessMessage 
              message={getSuccess('demo1')} 
              onDismiss={() => clearSuccess('demo1')}
            />
          )}
          {getSuccess('demo2') && (
            <SuccessMessage 
              message={getSuccess('demo2')} 
              onDismiss={() => clearSuccess('demo2')}
            />
          )}
        </div>

        {/* Error Handling Demo */}
        <div style={sectionStyle}>
          <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px' }}>Error Handling</h3>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <button
              onClick={() => simulateError('errorDemo')}
              style={{
                padding: '8px 16px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Trigger Error
            </button>
            <button
              onClick={() => clearError('errorDemo')}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Clear Error
            </button>
          </div>
          {getError('errorDemo') && (
            <ErrorMessage 
              error={getError('errorDemo')} 
              onDismiss={() => clearError('errorDemo')}
            />
          )}
        </div>

        {/* User Preferences Demo */}
        <div style={sectionStyle}>
          <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px' }}>User Preferences</h3>
          <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
            <p><strong>Theme:</strong> {userPreferences.theme}</p>
            <p><strong>Language:</strong> {userPreferences.language}</p>
            <p><strong>Auto-save:</strong> {userPreferences.autoSave ? 'Enabled' : 'Disabled'}</p>
            <p><strong>Notifications:</strong> {userPreferences.notifications ? 'Enabled' : 'Disabled'}</p>
            <p><strong>Items per page:</strong> {userPreferences.itemsPerPage}</p>
          </div>
        </div>

        {/* Form State Demo */}
        <div style={sectionStyle}>
          <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px' }}>Form State Management</h3>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
              Test Form Field:
            </label>
            <input
              type="text"
              value={formData.step1?.testField || ''}
              onChange={(e) => updateFormData('step1', { testField: e.target.value })}
              placeholder="Type something to test form state..."
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => validateStep(1)}
              style={{
                padding: '6px 12px',
                backgroundColor: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Validate Form
            </button>
            <button
              onClick={resetForm}
              style={{
                padding: '6px 12px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Reset Form
            </button>
          </div>
          {formData.step1?.testField && (
            <p style={{ fontSize: '12px', color: '#10b981', marginTop: '8px' }}>
              Form state: "{formData.step1.testField}"
            </p>
          )}
        </div>

        <div style={{ 
          padding: '12px', 
          backgroundColor: '#dbeafe', 
          borderRadius: '6px',
          fontSize: '12px',
          color: '#1e40af'
        }}>
          <p style={{ margin: 0 }}>
            🎯 This demo showcases the enhanced React Context API implementation with:
            loading states, error handling, user preferences, and form state management.
            All state is persisted to localStorage where appropriate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StateDemo;
