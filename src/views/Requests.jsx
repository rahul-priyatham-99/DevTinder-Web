import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../../store/requestSlice";
import { useDispatch, useSelector } from "react-redux";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/review/${status}/${_id}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1 className="flex justify-center my-10">No requests found !!!</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Requests</h1>
      <div>
        {requests.map((request) => {
          const { _id, firstName, lastName, age, gender, about, photoUrl } =
            request.fromUserId;
          return (
            <div
              key={_id}
              className="flex items-center gap-4 my-3 w-1/3 mx-auto p-4 rounded-xl bg-base-300 shadow-md hover:shadow-lg transition-all"
            >
              <img
                src={photoUrl}
                alt="profile"
                className="w-20 h-20 rounded-full object-cover flex-shrink-0"
              />

              <div className="text-left">
                <h2 className="font-bold text-lg">
                  {firstName} {lastName}
                </h2>

                <p className="text-sm opacity-70">
                  {age} • {gender}
                </p>

                <p className="mt-1 text-sm">{(about && about.length > 50) ? about.slice(0, 85) + "..." : about}</p>
              </div>
              <div className="ml-auto flex gap-3">
                <button
                  className="btn bg-primary px-4"
                  onClick={() => {
                    reviewRequest("accepted", request._id);
                  }}
                >
                  Accept
                </button>

                <button
                  className="btn bg-secondary px-4"
                  onClick={() => {
                    reviewRequest("rejected", request._id);
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
