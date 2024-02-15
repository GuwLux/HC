import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  useEffect(() => {
    fetch("https://hcbackend.onrender.com/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9", padding: "20px" }}>
      <div style={{ backgroundColor: "#333", color: "#fff", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button onClick={toggleSideMenu} style={{ marginRight: "20px", border: "none", background: "none", color: "#fff", fontSize: "1.2rem", cursor: "pointer" }}>&#9776;</button>
          <Link to="/" style={{ textDecoration: "none", color: "#fff", fontSize: "1.5rem", fontWeight: "bold" }}>弘群</Link>
        </div>
        <div>
          <input
            type="text"
            placeholder="搜尋產品..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "8px", fontSize: "1rem" }}
          />
        </div>
      </div>

      <div style={{ display: sideMenuOpen ? "block" : "none", backgroundColor: "#333", color: "#fff", padding: "20px", marginTop: "10px" }}>
        {/* 公司資訊 */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "5px" }}>公司資訊</h3>
          <p style={{ fontSize: "1rem", marginBottom: "5px" }}>地址： <a href="https://maps.app.goo.gl/hNZmSEBuqMxP8kq3A" target="_blank" rel="noopener noreferrer">新北市三芝區中正路二段6號</a></p>
          <p style={{ fontSize: "1rem", marginBottom: "5px" }}>電話：02-2636-5950</p>
          <p style={{ fontSize: "1rem", marginBottom: "0" }}>
            營業時間：<br />
            星期日 09:30–20:00<br />
            星期一 09:30–20:00<br />
            星期二 休息<br />
            星期三 09:30–20:00<br />
            星期四 09:30–20:00<br />
            星期五 09:30–20:00<br />
            星期六 09:30–20:00
          </p>
        </div>
        {/* 其他側拉選單項目 */}
      </div>

      <h1 style={{ textAlign: "center", marginBottom: "20px", fontSize: "2rem" }}>產品列表</h1>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
        {filteredProducts.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            style={{ textDecoration: "none", color: "inherit", width: "300px", marginBottom: "20px" }}
          >
            <div style={{ border: "1px solid #ddd", borderRadius: "5px", padding: "15px", boxSizing: "border-box", textAlign: "center" }}>
              <img
                src={`data:image/jpeg;base64,${product.image1}`}
                alt={product.name}
                style={{ maxWidth: "100%", height: "auto", borderRadius: "5px", marginBottom: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
              />
              <h3 style={{ fontSize: "1.2rem", marginBottom: "5px" }}>{product.name}</h3>
              <p style={{ fontSize: "1rem", marginBottom: "5px" }}>{product.type}</p>
              <p style={{ fontSize: "1rem", marginBottom: "5px" }}>價格：${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
