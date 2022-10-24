import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const res = await axios.get(
      `  https://ecommerce-mern-api.vercel.app/api/products/${id}`
    );
    setProduct(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleQuantity = (type) => {
    switch (type) {
      case "inc":
        setQuantity(quantity + 1);
        break;
      case "dec":
        quantity > 1 && setQuantity(quantity - 1);
        break;

      default:
        setQuantity(quantity);
        break;
    }
  };

  const cartHandler = () => {
    dispatch(addCart({ ...product, quantity }));
  };

  return loading ? (
    <div style={{ textAlign: "center", marginTop: "40px " }}>Loading.....</div>
  ) : (
    <div className="ProductDetails">
      <div className="productDetails-right">
        <img src={product.img} alt="" />
      </div>
      <div className="productDetails-left">
        <div className="productDetails-title">{product.title}</div>
        <div className="productDetails-price">Price: {product.price}</div>
        <div className="productDetails-size">Size: {product.size}</div>
        <div className="productDetails-color">Color: {product.color}</div>
        <div className="productDetails-desc">Details: {product.desc}</div>
        <div>
          <button onClick={() => handleQuantity("dec")}>-</button> {quantity}
          <button onClick={() => handleQuantity("inc")}>+</button>
        </div>
        <button onClick={cartHandler}> Add Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
