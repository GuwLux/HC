import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // 從後端 API 擷取產品
    fetch("https://hcbackend.onrender.com/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("擷取產品時發生錯誤：", error));
  }, []);

  // 搜尋功能
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>公司名</h1>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="搜尋產品..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "5px", marginRight: "10px" }}
        />
      </div>

      <h2>產品列表</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between", // 在不同屏幕大小下調整商品卡片的排列方式
        }}
      >
        {filteredProducts.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              width: "calc(16.666% - 20px)", // 在電腦上每行 6 個商品卡片
              margin: "10px",
              "@media (max-width: 768px)": {
                width: "calc(50% - 20px)", // 在手機上每行 2 個商品卡片
              },
            }}
          >
            <div
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                boxSizing: "border-box",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={`data:image/jpeg;base64,${product.image}`}
                alt={product.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "125px", // 將最大高度設置為父元素的高度
                  marginBottom: "10px",
                }}
              />

              <h3 style={{ fontSize: "1.2em" }}>{product.name}</h3>
              <p>{product.type}</p>
              <p>價格：${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
