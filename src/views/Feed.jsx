import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../../store/feedSlice';
import UserCard from '../components/UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const fetchFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {withCredentials: true});
      dispatch(addFeed(res.data.data));
    } catch(err){
      console.error("Error while fetching feed:", err)
    }
  }
  useEffect(() => {
    fetchFeed();
  }, [])
  return (
    <div className="flex justify-start mt-5 overflow-x-auto">
      {feed &&
        feed?.map((item) => {
          return (
            <div className="w-100 p-10" key={item._id}>
              <UserCard user={item} />
            </div>
          );
        })}
    </div>
  );
}

export default Feed