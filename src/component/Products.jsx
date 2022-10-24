import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import { Outlet } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const res = await axios.get(
      "https://ecommerce-mern-api.vercel.app/api/products"
    );
    setProducts(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="products-container">
      <h1>Products</h1>
      {loading ? (
        <div style={{ fontSize: "24px" }}>Loading.....</div>
      ) : (
        <div className="products">
          {products?.map((product) => (
            <div className="product" key={product._id}>
              <Product product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
