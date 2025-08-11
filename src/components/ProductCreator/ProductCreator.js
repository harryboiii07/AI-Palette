import React from 'react';
import { useAppContext } from '../../context/AppContext';
import StepIndicator from './StepIndicator';
import ErrorMessage from '../common/ErrorMessage';
import LoadingSpinner from '../common/LoadingSpinner';
import SuccessMessage from '../common/SuccessMessage';
import { productsAPI } from '../../services/api';

const ProductCreator = () => {
  const { 
    currentStep, 
    navigateToStep, 
    aiSuggestions, 
    formData, 
    updateFormData, 
    resetForm,
    getFormErrors,
    isLoading,
    getError,
    getSuccess,
    clearError,
    clearSuccess,
    setSuccess,
    setLoading
  } = useAppContext();

  const handleNextStep = () => {
    if (currentStep < 4) {
      navigateToStep(currentStep + 1);
    } else {
      handleFormSubmit();
    }
  };

  const handlePreviousStep = () => {
    navigateToStep(Math.max(1, currentStep - 1));
  };

  const handleFormSubmit = async () => {
    setLoading('submitProduct', true);
    try {
      // Create product using real API
      const productData = {
        name: formData.step4.selectedSuggestion?.name || formData.step4.customName,
        category: formData.step1.category,
        target_demographics: formData.step2.ageGroup,
        region: formData.step2.region,
        ingredients: formData.step4.selectedSuggestion?.description || 'Custom product',
        flavor_profile: formData.step3.flavors.join(', ')
      };
      
      console.log('Form data structure:', formData);
      console.log('Product data being sent:', productData);
      
      const response = await productsAPI.create(productData);
      
      if (response.success && response.data) {
        setSuccess('submitProduct', `Product "${response.data.name}" created successfully with market score: ${response.data.market_score}!`);
        resetForm();
        navigateToStep(1);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Failed to create product:', error);
      // For now, just log the error - the API service handles global error states
      alert(`Failed to create product: ${error.message}`);
    } finally {
      setLoading('submitProduct', false);
    }
  };

  const handleCategorySelect = (category) => {
    updateFormData('step1', { category });
  };

  const handleFlavorToggle = (flavor) => {
    const currentFlavors = formData.step3.flavors || [];
    const updatedFlavors = currentFlavors.includes(flavor)
      ? currentFlavors.filter(f => f !== flavor)
      : [...currentFlavors, flavor];
    updateFormData('step3', { flavors: updatedFlavors });
  };

  const handleSuggestionSelect = (suggestion) => {
    updateFormData('step4', { selectedSuggestion: suggestion });
  };

  const renderStepContent = () => {
    const stepErrors = getFormErrors(`step${currentStep}`);

    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0' }}>Select Product Category</h3>
            {stepErrors.category && <ErrorMessage error={stepErrors.category} />}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {['Beverages', 'Snacks', 'Dairy', 'Cereals', 'Frozen Foods', 'Confectionery'].map(category => (
                <button 
                  key={category} 
                  onClick={() => handleCategorySelect(category)}
                  style={{
                    padding: '16px',
                    border: `2px solid ${formData.step1.category === category ? '#2563eb' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    backgroundColor: formData.step1.category === category ? '#dbeafe' : 'white',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ width: '24px', height: '24px', backgroundColor: '#6b7280', margin: '0 auto 8px', borderRadius: '4px' }}></div>
                  <p style={{ fontWeight: '500', margin: 0 }}>{category}</p>
                </button>
              ))}
            </div>
            {formData.step1.category && (
              <p style={{ color: '#10b981', fontSize: '14px', marginTop: '16px' }}>
                Selected: {formData.step1.category}
              </p>
            )}
          </div>
        );

      case 2:
        return (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0' }}>Target Demographics</h3>
            {stepErrors.ageGroup && <ErrorMessage error={stepErrors.ageGroup} />}
            {stepErrors.region && <ErrorMessage error={stepErrors.region} />}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Age Group</label>
                <select 
                  value={formData.step2.ageGroup || ''}
                  onChange={(e) => updateFormData('step2', { ageGroup: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: `1px solid ${stepErrors.ageGroup ? '#ef4444' : '#d1d5db'}`, 
                    borderRadius: '8px' 
                  }}
                >
                  <option value="">Select age group</option>
                  <option value="18-25">18-25</option>
                  <option value="26-35">26-35</option>
                  <option value="36-45">36-45</option>
                  <option value="46-60">46-60</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Region</label>
                <select 
                  value={formData.step2.region || ''}
                  onChange={(e) => updateFormData('step2', { region: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: `1px solid ${stepErrors.region ? '#ef4444' : '#d1d5db'}`, 
                    borderRadius: '8px' 
                  }}
                >
                  <option value="">Select region</option>
                  <option value="North America">North America</option>
                  <option value="Europe">Europe</option>
                  <option value="Asia Pacific">Asia Pacific</option>
                  <option value="Latin America">Latin America</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0' }}>Flavor Preferences</h3>
            {stepErrors.flavors && <ErrorMessage error={stepErrors.flavors} />}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {['Sweet', 'Spicy', 'Salty', 'Sour', 'Bitter', 'Umami', 'Fruity', 'Herbal'].map(flavor => {
                const isSelected = formData.step3.flavors?.includes(flavor);
                return (
                  <label 
                    key={flavor} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      padding: '12px', 
                      border: `1px solid ${isSelected ? '#2563eb' : '#e5e7eb'}`, 
                      borderRadius: '8px',
                      backgroundColor: isSelected ? '#dbeafe' : 'white',
                      cursor: 'pointer'
                    }}
                  >
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={() => handleFlavorToggle(flavor)}
                      style={{ marginRight: '12px' }} 
                    />
                    <span>{flavor}</span>
                  </label>
                );
              })}
            </div>
            {formData.step3.flavors?.length > 0 && (
              <p style={{ color: '#10b981', fontSize: '14px', marginTop: '16px' }}>
                Selected: {formData.step3.flavors.join(', ')}
              </p>
            )}
          </div>
        );

      case 4:
        return (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0' }}>AI Generated Suggestions</h3>
            {stepErrors.selection && <ErrorMessage error={stepErrors.selection} />}
            
            {isLoading('generateSuggestions') ? (
              <LoadingSpinner message="Generating AI suggestions..." />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {aiSuggestions.map((suggestion, idx) => {
                  const isSelected = formData.step4.selectedSuggestion?.name === suggestion.name;
                  return (
                    <div 
                      key={idx} 
                      style={{ 
                        padding: '16px', 
                        border: `2px solid ${isSelected ? '#2563eb' : '#e5e7eb'}`, 
                        borderRadius: '8px',
                        backgroundColor: isSelected ? '#dbeafe' : 'white'
                      }}
                    >
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
                        <button 
                          onClick={() => handleSuggestionSelect(suggestion)}
                          style={{ 
                            color: isSelected ? '#166534' : '#2563eb', 
                            fontSize: '14px', 
                            fontWeight: '500', 
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer' 
                          }}
                        >
                          {isSelected ? '✓ Selected' : 'Select This Concept'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 12px 0' }}>Or create your own:</h4>
              <input
                type="text"
                placeholder="Enter custom product name..."
                value={formData.step4.customName || ''}
                onChange={(e) => updateFormData('step4', { customName: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '24px 15%' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Global notifications */}
        {getSuccess('submitProduct') && (
          <SuccessMessage 
            message={getSuccess('submitProduct')}
            onDismiss={() => clearSuccess('submitProduct')}
          />
        )}
        {getError('submitProduct') && (
          <ErrorMessage 
            error={getError('submitProduct')}
            onDismiss={() => clearError('submitProduct')}
          />
        )}

        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Create New Product</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <StepIndicator currentStep={currentStep} />
                <button
                  onClick={resetForm}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Reset Form
                </button>
              </div>
            </div>
          </div>

          <div style={{ padding: '24px' }}>
            {renderStepContent()}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>
              <button
                onClick={handlePreviousStep}
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

              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                Step {currentStep} of 4
              </div>

              <button
                onClick={handleNextStep}
                disabled={isLoading('submitProduct')}
                style={{
                  padding: '8px 24px',
                  backgroundColor: isLoading('submitProduct') ? '#9ca3af' : '#2563eb',
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: isLoading('submitProduct') ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {isLoading('submitProduct') && (
                  <LoadingSpinner size="small" message="" />
                )}
                {currentStep === 4 ? 
                  (isLoading('submitProduct') ? 'Creating...' : 'Create Product') : 
                  'Next'
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreator;
