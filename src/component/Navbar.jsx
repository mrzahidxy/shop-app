import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { removeFullCart } from "../redux/cartSlice";
import { logout } from "../redux/userSlice";
const Navbar = () => {
  const activeLink = ({ isActive }) => (isActive ? "link active" : "link");
  const { quantity } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(removeFullCart());
    dispatch(logout());
  };
  return (
    <div className="navbar">
      <div className="navbar-left">Shop App</div>
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
