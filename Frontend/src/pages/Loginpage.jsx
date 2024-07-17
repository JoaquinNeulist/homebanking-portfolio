import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, erasedError } from "../redux/actions/authActions";
import axios from "axios";

const Loginpage = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((store) => store.auth);
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    dispatch(erasedError());
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;
    const newErrors = {};

    if (!email || email.trim() === "") {
      newErrors.email = "Email is required";
    }
    if (!password || password.trim() === "") {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/login",
          { email, password }
        );

        const token = response.data;
        localStorage.setItem("token", token);

        const responseCurrent = await axios.get(
          "http://localhost:8080/api/auth/current",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let client = responseCurrent.data;
        client.token = token;

        dispatch(login(client));
        navigate("/accounts");
      } catch (err) {
        if (err.response) {
          // Error de respuesta del servidor
          if (err.response.status === 400) {
            // Error de credenciales inválidas
            setErrors({ server: "Invalid email or password" });
          } else {
            console.error("Server Error:", err.response.data);
          }
        } else if (err.request) {
          // Error de red
          console.error("Network Error:", err.request);
        } else {
          // Otro tipo de error
          console.error("Error:", err.message);
        }
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="w-full relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/loginimage.jpg"
          alt="Login Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 w-[80%] h-[80%] bg-gray-200 flex items-center justify-start gap-10 border-4 flex-col border-black md:w-[60%] lg:w-[45%]">
        <img
          src="/assets/logo.png"
          alt=""
          className="w-[100px] mt-4 h-[75px] md:w-[150px] md:h-[125px] lg:w-[200px] lg:h-[175px]"
        />
        <form className="flex flex-col items-center w-full gap-8">
          <div className="flex flex-col w-[80%]">
            <label htmlFor="email" className="font-semibold">
              E-mail
            </label>
            <input
              ref={inputEmail}
              type="text"
              name="email"
              placeholder="Enter your email"
              className="w-full h-[50px] rounded-xl border-2 border-gray-800"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="flex flex-col w-[80%] relative">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <div className="flex">
              <input
                ref={inputPassword}
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full h-[50px] rounded-xl border-2 border-gray-800 pr-12"
              />
              <img
                src={
                  passwordVisible
                    ? "/assets/ojoabierto.png"
                    : "/assets/ojocerrado.png"
                }
                alt="toggle visibility"
                className="transform self-end cursor-pointer h-12"
                onClick={togglePasswordVisibility}
              />
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
        </form>
        {errors.server && <p className="text-red-500">{errors.server}</p>}
        <div className="flex flex-col items-center justify-center py-2 gap-2">
          <button
            onClick={handleLogin}
            className="rounded-xl border bg-blue-400 p-4 px-12 text-white lg:text-[20px]"
          >
            Login
          </button>
          <p className="md:text-[18px] lg:text-[20px]">Or</p>
          <Link to="/signup">
            <p className="underline text-blue-500 md:text-[18px] lg:text-[20px]">
              Sign up
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
