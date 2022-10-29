import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchProduct = () => {
  const { searchProduct } = useSelector((state) => state.product);

  console.log(searchProduct);
  return (
    <div className="search-container">
      <h3>Search results: </h3>
      {searchProduct.map((product) => (
        <Link
          key={product._id}
          style={{ textDecoration: "none", color: "black" }}
          to={`/products/${product._id}`}
        >
          <div className="search-content" key={product._id}>
            <img src={product.img} alt="" />
            <div className="search-info">
              <p className="product-title">{product.title}</p>
              <p className="product-price">{product.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchProduct;
