import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age,setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [about, setAbout] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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
      setErrorMessage(err.response.data);
      console.error(err)
    }
  };

  const handleSignup = async() => {
    try {
      setErrorMessage("");
       if (password !== confirmPassword) {
         setErrorMessage("Passwords do not match");
         return;
       }
       const signupReqBody = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        gender: gender,
        about: about,
        emailId: emailId,
        password: password
       }
       const res = await axios.post(BASE_URL + "/signup", signupReqBody, {withCredentials: true})
       dispatch(addUser(res.data.data));
       navigate("/profile")
    } catch(err){
      setErrorMessage(err.response.data);
      console.error(err)
    }
  }
  return (
    <div className="flex justify-center my-10">
      <div className="card card-dash bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Signup"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs p-4">
                  <div className="label -ml-4 mt-3">
                    <span className="label-text mb-1">First name:</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs px-2"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs p-4">
                  <div className="label -ml-4 mt-3">
                    <span className="label-text mb-1">Last name:</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs px-2"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs p-4">
                  <div className="label -ml-4 mt-3">
                    <span className="label-text mb-1">Age:</span>
                  </div>
                  <input
                    type="number"
                    min="18"
                    className="input input-bordered w-full max-w-xs px-2"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs p-4">
                  <div className="label -ml-4 mt-3">
                    <span className="label-text mb-1">Gender:</span>
                  </div>
                  <select
                    className="select select-bordered w-full max-w-xs p-2"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </label>
                <label className="form-control w-full max-w-xs p-4">
                  <div className="label -ml-4 mt-3">
                    <span className="label-text mb-1">About:</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered w-full max-w-xs p-2"
                    rows="4"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Tell us about yourself.."
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs p-4">
              <div className="label -ml-4 mt-3">
                <span className="label-text mb-1">Email:</span>
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
                <span className="label-text mb-1">Password:</span>
              </div>
              <input
                type="password"
                className="input input-bordered w-full max-w-xs px-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {!isLoginForm && (
              <label className="form-control w-full max-w-xs p-4">
                <div className="label -ml-4 mt-3">
                  <span className="label-text mb-1">Confirm Password:</span>
                </div>
                <input
                  type="password"
                  className="input input-bordered w-full max-w-xs px-2"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
            )}
          </div>
          <p className="text-red-500 text-center my-2">
            {errorMessage && errorMessage}
          </p>
          <div className="card-actions justify-center mt-4">
            <button
              className="btn bg-primary px-4"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login" : "Sign up"}
            </button>
          </div>
          <p
            className="text-center my-2 cursor-pointer"
            onClick={() => {
              setIsLoginForm((value) => !value);
            }}
          >
            {isLoginForm
              ? "Don't have an account, create one..."
              : "Existing user ? click here to login..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
