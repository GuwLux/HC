import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import ProductManagement from './ProductManagement';  // 新增商家管理商品的頁面

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/manage" element={<ProductManagement />} />
      </Routes>
    </Router>
  );
}

export default App;