import { useRef, useState } from "react";
import axios from "axios";
import { login } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://ecommerce-mern-api.vercel.app/api/auth/login",
        {
          username: emailRef.current.value,
          password: passRef.current.value,
        }
      );
      dispatch(login(res.data));
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <h1>Log In</h1>
      <form onSubmit={loginHandler}>
        <input ref={emailRef} type="text" placeholder="Enter e-mail" />
        <input ref={passRef} type="password" placeholder="Enter password" />
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
