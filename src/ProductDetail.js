// ProductDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log("ProductDetail ID:", id);  // 確認 id 是否正確
    if (id) {
      // 根據產品 ID 擷取產品詳細信息
      fetch(`http://192.168.1.125:3001/api/products/${id}`)
        .then(response => response.json())
        .then(data => setProduct(data))
        .catch(error => console.error('擷取產品詳細信息時發生錯誤：', error));
    }
  }, [id]);

  if (!product) {
    return <div>載入中...</div>;
  }

  return (
    <div>
      <h2>產品詳情</h2>
      <div style={{ textAlign: 'center' }}>
        <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100%', maxHeight: '300px', marginBottom: '10px' }} />
        <h3 style={{ fontSize: '1.5em' }}>{product.name}</h3>
        <p style={{ fontSize: '1.2em' }}>價格：${product.price}</p>
        {/* 根據需要添加更多詳情 */}
      </div>
    </div>
  );
};

export default ProductDetail;
