import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId: emailId,
        password: password,
      }, {withCredentials: true});
      const userData = res.data;
      dispatch(addUser(userData))
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card card-dash bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs p-4">
              <div className="label -ml-4 mt-3">
                <span className="label-text mb-1">Email</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs px-2"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs p-4">
              <div className="label -ml-4 mt-3">
                <span className="label-text mb-1">Password</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs px-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="card-actions justify-center mt-4">
            <button className="btn bg-primary px-4" onClick={() => handleLogin()}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
