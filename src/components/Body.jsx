import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../store/userSlice";
import { useEffect } from "react";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    if(userData) return;
    try {
      const userRes = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      if (userRes?.data) {
        dispatch(addUser(userRes.data));
      }
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="flex-1">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
