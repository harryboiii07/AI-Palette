import React from 'react';
import { useAppContext } from '../../context/AppContext';
import StepIndicator from './StepIndicator';

const ProductCreator = () => {
  const { currentStep, setCurrentStep, aiSuggestions } = useAppContext();

  const handleNextStep = () => {
    setCurrentStep(Math.min(4, currentStep + 1));
  };

  const handlePreviousStep = () => {
    setCurrentStep(Math.max(1, currentStep - 1));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
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
        );

      case 2:
        return (
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
        );

      case 3:
        return (
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
        );

      case 4:
        return (
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
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '24px 15%' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Create New Product</h2>
              <StepIndicator currentStep={currentStep} />
            </div>
          </div>

          <div style={{ padding: '24px' }}>
            {renderStepContent()}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
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
              <button
                onClick={handleNextStep}
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
};

export default ProductCreator;
