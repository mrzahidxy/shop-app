import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Order = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  console.log("order", orders);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(
        `https://ecommerce-mern-api.vercel.app/api/orders/find/${currentUser._id}`,
        {
          headers: {
            token: `Bearer ${currentUser.accessToken}`,
          },
        }
      );
      setOrders(res.data);
      console.log("order", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="order-container">
      <h3>Order History</h3>
      <div className="orders">
        {orders?.map((order) => (
          <div className="order">
            <div className="order-info">
              <div className="order-id"><b>Order Id:</b> {order._id}</div>
              <div className="order-amount"><b>Amount: </b>{order.ampunt}</div>
              <div className="order-status"><b>Status: </b>{order.status}</div>
              <div className="order-date"><b>Date: </b>{order.createdAt}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
