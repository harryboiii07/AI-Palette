import React from 'react';

const StepIndicator = ({ currentStep, totalSteps = 4 }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const step = index + 1;
        return (
          <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: step <= currentStep ? '#2563eb' : '#e5e7eb',
              color: step <= currentStep ? 'white' : '#6b7280'
            }}>
              {step}
            </div>
            {step < totalSteps && (
              <div style={{ 
                width: '48px', 
                height: '1px', 
                backgroundColor: step < currentStep ? '#2563eb' : '#e5e7eb' 
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
