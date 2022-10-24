import { Link, Outlet } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Link
      to={`/products/${product._id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className="product">
        <div className="product-img">
          <img src={product.img} alt="" />
        </div>
        <div className="product-info">
          <div className="product-title">{product.title} </div>
          <div className="product-price"> {product.price} Tk</div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
