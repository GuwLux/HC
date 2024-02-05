import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // 從後端 API 擷取產品
    fetch('http://192.168.1.125:3001/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('擷取產品時發生錯誤：', error));
  }, []);

  // 搜尋功能
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>公司名</h1>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="搜尋產品..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '5px', marginRight: '10px' }}
        />
      </div>

      <h2>產品列表</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {filteredProducts.map(product => (
          <Link key={product._id} to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit', width: '45%', margin: '10px' }}>
            <div style={{ border: '1px solid #ddd', padding: '10px' }}>
              <img
                src={`data:image/jpeg;base64,${product.image}`}
                alt={product.name}
                style={{ maxWidth: '100%', maxHeight: '150px', marginBottom: '10px' }}
              />
              <h3 style={{ fontSize: '1.2em' }}>{product.name}</h3>
              <p>價格：${product.price}</p>
              <p>點擊查看詳情</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;