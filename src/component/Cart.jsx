import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { removeCart, removeFullCart } from "../redux/cartSlice";

const Cart = () => {
  const { products, total } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const [stripeToken, setStripeToken] = useState();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const key =
    "pk_test_51LYYjtE3f7z3X8dphqRDYL7Qu6RtpFgQogUTvuGmAMDXD30BzFzycBEoyVqgMLTR2KZhYpgp9CPbJ5kk7saBae3700sXRqG6kZ";
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  // console.log("token", stripeToken);
  // console.log("user", currentUser._id, currentUser.accessToken);
  //Payment
  const makePayment = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce-mern-api.vercel.app/api/checkout/payment",
        {
          tokenId: stripeToken.id,
          amount: total,
        }
      );

      alert("Payment Completed");
      orderConfirm();
      setLoading(false);
      navigate("/");
      dispatch(removeFullCart());
      console.log("payment info", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    stripeToken && makePayment();
  }, [stripeToken]);

  //order
  const orderConfirm = async () => {
    try {
      const res = await axios.post(
        "https://ecommerce-mern-api.vercel.app/api/orders",
        {
          userId: currentUser._id,
          products: orders,
          amount: total,
          address: {
            House: 5,
          },
          status: "Pending",
        },
        {
          headers: {
            token: `Bearer ${currentUser.accessToken}`,
          },
        }
      );

      console.log("order", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-items">
        <h3>Your Cart</h3>
        {products?.map((item) => (
          <div className="cart-item">
            <img src={item.img} alt="" />
            <div className="cart-item-info">
              <p>
                <b>Product: </b>
                {item.title}
              </p>
              <p>
                <b>Price:</b> {item.price}
              </p>
              <p>
                <b>Quantity:</b> {item.quantity}
              </p>
              <button onClick={() => dispatch(removeCart(item))}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-payment">
        <h3>Payment</h3>
        <p>
          <b>Sub-total:</b> {total}
        </p>
        <p>
          <b>Vat: </b>
          {(15 / 100) * total}
        </p>
        <p>
          <b>Total: </b>
          {total + (15 / 100) * total}
        </p>

        {currentUser ? (
          <StripeCheckout
            name="shop app"
            billingAddress
            shippingAddress
            amount={total}
            stripeKey={key}
            token={onToken}
          ></StripeCheckout>
        ) : (
          <div  style={{
            color: "red",
            fontSize: "18px",
          }}>To order Kindly  Log In</div>
        )}

        {loading && (
          <p
            style={{
              color: "red",
              fontSize: "14px",
            }}
          >
            Payment ongoing....
          </p>
        )}
      </div>
    </div>
  );
};

export default Cart;
