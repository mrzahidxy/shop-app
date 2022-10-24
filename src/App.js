import "./App.css";
import Navbar from "./component/Navbar.jsx";
import Login from "./component/Login.jsx";
import Products from "./component/Products.jsx";
import ProductDetails from "./component/ProductDetails";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Cart from "./component/Cart";
import { useSelector } from "react-redux";
import Order from "./component/Order";

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route path="products" element={<Outlet />}>
              <Route path=":id" element={<ProductDetails />} />
              <Route index element={<Products />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Products />} />
            <Route path="order" element={currentUser ? <Order /> : <Navigate replace to="/login" />} />
            <Route path="cart" element={<Cart />} />
            <Route index element={<Products />} />

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
