import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../../context/AppContext';
import ProductTable from './ProductTable';

const ProductAnalysis = () => {
  const { filteredProducts, searchTerm, setSearchTerm, categoryFilter, setCategoryFilter } = useAppContext();

  const performanceData = [
    { month: 'Jan', product1: 65, product2: 45, product3: 70 },
    { month: 'Feb', product1: 70, product2: 52, product3: 75 },
    { month: 'Mar', product1: 75, product2: 58, product3: 80 },
    { month: 'Apr', product1: 80, product2: 65, product3: 85 },
  ];

  return (
    <div style={{ padding: '24px 15%' }}>
      <ProductTable 
        products={filteredProducts}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      <div style={{ marginTop: '24px', backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>Product Performance Comparison</h3>
        <div style={{ width: '100%', height: '300px', backgroundColor: '#f9fafb', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="product1" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="product2" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="product3" stroke="#F59E0B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProductAnalysis;
