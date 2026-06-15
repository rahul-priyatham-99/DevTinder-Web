import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../store/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections)
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections/accepted", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if(!connections) return;
  if(connections.length === 0) return <h1 className="flex justify-center my-10">No connections found !!!</h1>
    
  
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Connections</h1>
      <div>
        {connections.map((connection) => {
            const {_id, firstName, lastName, age, gender, about, photoUrl} = connection
            return (
              <div key={_id} className="flex items-center gap-4 my-3 w-1/3 mx-auto p-4 rounded-xl bg-base-300 shadow-md hover:shadow-lg transition-all">
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

                  <p className="mt-1 text-sm">{about}</p>
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default Connections;
