import React from 'react';

const RecentActivity = ({ products, onViewAll }) => {
  return (
    <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>Recent Activity</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {products.slice(0, 3).map(product => (
          <div key={product.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <div>
              <p style={{ fontWeight: '500', margin: '0 0 4px 0' }}>{product.name}</p>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{product.category} • Score: {product.score}</p>
            </div>
            <span style={{
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '600',
              backgroundColor: product.status === 'Active' ? '#dcfce7' : '#fef3c7',
              color: product.status === 'Active' ? '#166534' : '#92400e'
            }}>
              {product.status}
            </span>
          </div>
        ))}
      </div>
      <button 
        onClick={onViewAll}
        style={{ width: '100%', marginTop: '16px', color: '#2563eb', fontSize: '14px', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        View All Products
      </button>
    </div>
  );
};

export default RecentActivity;
