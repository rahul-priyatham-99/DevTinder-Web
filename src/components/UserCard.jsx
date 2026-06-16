import axios from 'axios';
import React from 'react';
import { BASE_URL } from "../utils/constants";
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from "../../store/feedSlice";

const UserCard = ({user}) => {
  const dispatch = useDispatch();
  const {_id, firstName, lastName, photoUrl, age, gender, skills, about} = user;

  const handleSendRequest = async(status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/send/${status}/${userId}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch(err){
      console.error(err)
    }
  }
  return (
    <div className="card bg-base-300 w-96 h-auto shadow-sm">
      <figure>
        <img
          src={photoUrl}
          alt="Profile"
          className="h-64 w-full object-cover"
        />
      </figure>
      <div className="card-body py-10">
        <h2 className="text-xl">{firstName + " " + lastName}</h2>
        {age && gender && <p className="-mt-2">{age + ", " + gender}</p>}
        {about && <p className="mt-2">{about}</p>}
        <div className="flex justify-center my-10 gap-5">
          <button
            className="btn bg-blue-600 p-2"
            onClick={() => {
              handleSendRequest("ignored", _id);
            }}
          >
            Ignore
          </button>
          <button
            className="btn bg-green-600 p-2"
            onClick={() => {
              handleSendRequest("interested", _id);
            }}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard