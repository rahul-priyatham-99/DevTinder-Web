import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { removeUser } from "../../store/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true },
        
      );
      if (res.status === 200) {
        dispatch(removeUser());
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          👽 DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex justify-center items-center gap-2">
          <div className="form-control">Welcome, {user?.firstName}</div>
          <div className="dropdown dropdown-end mx-5 ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    user.photoUrl
                      ? user?.photoUrl
                      : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li
                onClick={() => {
                  navigate("/profile");
                  document.activeElement?.blur();
                }}
              >
                <Link
                  onClick={() => document.activeElement?.blur()}
                  to="/profile"
                  className="justify-between"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => document.activeElement?.blur()}
                  to="/connections"
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => document.activeElement?.blur()}
                  to="/requests"
                >
                  Requests
                </Link>
              </li>
              <li
                onClick={() => {
                  () => document.activeElement?.blur();
                  handleLogout();
                }}
              >
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
