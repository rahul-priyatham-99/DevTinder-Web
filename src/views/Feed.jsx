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

  if (!feed || feed.length <= 0)
    return <h1 className="flex justify-center my-20">No users found !!!</h1>;
  return (
    <div className="flex justify-center my-20 overflow-x-auto">
      <div className="w-100">
        {feed && (
          <div>
            <UserCard user={feed?.[0]} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Feed