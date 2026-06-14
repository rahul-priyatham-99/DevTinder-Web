import React from "react";
import ProfileForm from "../components/ProfileForm";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    <>
      {user && (
        <div>
          <ProfileForm user={user} />
        </div>
      )}
    </>
  );
};

export default Profile;
