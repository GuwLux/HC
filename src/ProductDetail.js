import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    console.log("ProductDetail ID:", id);  
    if (id) {
      fetch(`https://hcbackend.onrender.com/api/products/${id}`)
        .then(response => response.json())
        .then(data => setProduct(data))
        .catch(error => console.error('擷取產品詳細信息時發生錯誤：', error));
    }
  }, [id]);

  const handleImageClick = () => {
    setCurrentImageIndex((currentImageIndex + 1) % (product.image4 ? 4 : (product.image3 ? 3 : (product.image2 ? 2 : 1))));
  };

  if (!product) {
    return <div>載入中...</div>;
  }

  return (
    <div>
      {/* Header */}
      <header style={{ backgroundColor: '#333', color: '#fff', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/" style={{ textDecoration: 'none', color: '#fff', fontSize: '1.2em', fontWeight: 'bold' }}>弘群</Link>
        </div>
      </header>

      {/* Product Detail */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8em', marginBottom: '20px' }}>產品詳情</h2>
        <img
          src={product[`image${currentImageIndex + 1}`]}
          alt={product.name}
          style={{
            maxWidth: '100%',
            maxHeight: '300px',
            marginBottom: '20px',
            cursor: 'pointer',
          }}
          onClick={handleImageClick}
        />
        <h3 style={{ fontSize: '1.5em', marginBottom: '10px' }}>{product.name}</h3>
        <p style={{ fontSize: '1.2em', marginBottom: '10px' }}>{product.description}</p>
        <p style={{ fontSize: '1.2em', marginBottom: '10px' }}>適用車種：{product.type}</p>
        <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>價格：${product.price}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
