import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeFullCart } from "../redux/cartSlice";
import { searchProduct } from "../redux/productSlice";
import { logout } from "../redux/userSlice";
const Navbar = () => {
  const activeLink = ({ isActive }) => (isActive ? "link active" : "link");
  const { quantity } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const [query, SetQuery] = useState(" ");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(searchProduct(query.toLowerCase()));
    navigate("/products/search");
  }, [query]);

  const logoutHandler = () => {
    dispatch(removeFullCart());
    dispatch(logout());
  };
  return (
    <div className="navbar">
      <div className="navbar-left">Shop App</div>
      <form className="search-bar">
        <input
          placeholder="search..."
          type="serach"
          value={query}
          onChange={(e) => SetQuery(e.target.value)}
        />
      </form>
      <div className="navbar-right">
        <NavLink className={activeLink} to="/products">
          Home
        </NavLink>
        <NavLink className={activeLink} to="/cart">
          {quantity} Cart
        </NavLink>
        <NavLink className={activeLink} to="/order">
          Order
        </NavLink>
        {currentUser ? (
          <NavLink className={activeLink} to="/" onClick={logoutHandler}>
            Log Out
          </NavLink>
        ) : (
          <NavLink className={activeLink} to="/login">
            Log In
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
