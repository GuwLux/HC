import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 從後端 API 擷取產品
    fetch("https://hcbackend.onrender.com/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("擷取產品時發生錯誤：", error));

    // 檢測裝置是否為手機
    const userAgent = navigator.userAgent.toLowerCase();
    setIsMobile(userAgent.includes("mobile") || userAgent.includes("tablet"));

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
          justifyContent: isMobile ? "center" : "space-around",
        }}
      >
        {filteredProducts.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              width: isMobile ? "45%" : "15%", // 手機和電腦瀏覽器上的寬度
              height: "320px", // 修改這裡，設定商品卡片的高度
              margin: "10px",
              flex: "0 0 14%", // 直接設定商品卡片的寬度
              // 手機版樣式
              "@media (max-width: 768px)": {
                width: "90%", // 手機瀏覽器上的寬度
                flex: "0 0 90%", // 手機瀏覽器上的寬度
              },
            }}
          >
            <div
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                height: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center", // 將內容置中
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
