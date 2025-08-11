import React from 'react';

const MetricsCard = ({ title, value, growthPercentage, color, subtitle }) => {
  return (
    <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 8px 0' }}>{title}</p>
          <p style={{ fontSize: '30px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
            {typeof value === 'number' && value > 1000 ? value.toLocaleString() : value}
            {title.includes('Rate') ? '%' : ''}
          </p>
        </div>
        <div style={{ width: '24px', height: '24px', backgroundColor: color, borderRadius: '4px' }}></div>
      </div>
      <p style={{ color: '#10b981', fontSize: '14px', margin: 0 }}>
        {growthPercentage && `+${growthPercentage}% from last month`}
        {subtitle && subtitle}
      </p>
    </div>
  );
};

export default MetricsCard;
