import React from 'react';

const ProductTable = ({ products, searchTerm, setSearchTerm, categoryFilter, setCategoryFilter }) => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', margin: 0 }}>Product Analysis</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              width: '256px'
            }}
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px'
            }}
          >
            <option value="">All Categories</option>
            <option value="Beverages">Beverages</option>
            <option value="Snacks">Snacks</option>
            <option value="Dairy">Dairy</option>
            <option value="Cereals">Cereals</option>
            <option value="Confectionery">Confectionery</option>
          </select>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#2563eb',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer'
          }}>
            Export
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Product</th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Category</th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Market Score</th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Created</th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '500' }}>{product.name}</div>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '14px' }}>{product.category}</td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', marginRight: '8px' }}>{product.score}</div>
                    <div style={{ width: '64px', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}>
                      <div style={{
                        width: `${product.score}%`,
                        height: '8px',
                        backgroundColor: '#10b981',
                        borderRadius: '4px'
                      }}></div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
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
                </td>
                <td style={{ padding: '16px 24px', fontSize: '14px' }}>{product.created}</td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer' }}>View</button>
                    <button style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}>Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductTable;
