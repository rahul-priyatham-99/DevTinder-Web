import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const ProfileForm = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstname] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [errorMessage, setErrorMessage] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleSaveProfile = async () => {
    setErrorMessage(null);
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    } catch (err) {
      console.log(err.response);
      setErrorMessage(err.response.data);
    }
  };
  return (
    <>
      <div className="relative flex flex-row gap-16 justify-center my-5">
        {showToast && (
          <div className="absolute -top-8 right-10 z-50">
            <div className="alert alert-success">
              <span>Profile updated successfully...</span>
            </div>
          </div>
        )}
        <div className="flex justify-center">
          <div className="card card-dash bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs p-4">
                  <div className="label -ml-4 mt-3">
                    <span className="label-text mb-1">First Name:</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs px-2"
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs p-4">
                  <div className="label -ml-4 mt-3">
                    <span className="label-text mb-1">Last Name:</span>
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
                    type="text"
                    className="input input-bordered w-full max-w-xs px-2"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs p-4">
                  <div className="label -ml-4 mt-3">
                    <span className="label-text mb-1">Gender:</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs px-2"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs p-4">
                  <div className="label -ml-4 mt-3">
                    <span className="label-text mb-1">About:</span>
                  </div>
                  <textarea
                    className="textarea p-2"
                    placeholder="About"
                    onChange={(e) => setAbout(e.target.value)}
                  >
                    {about}
                  </textarea>
                </label>
                <label className="form-control w-full max-w-xs p-4">
                  <div className="label -ml-4 mt-3">
                    <span className="label-text mb-1">Photo URL:</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs px-2"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
                {errorMessage && <p className="text-red-400">{errorMessage}</p>}
              </div>
              <div className="card-actions justify-center mt-4">
                <button
                  className="btn bg-primary px-4"
                  onClick={handleSaveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="sticky top-20">
          <UserCard
            user={{ firstName, lastName, age, gender, about, photoUrl }}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
