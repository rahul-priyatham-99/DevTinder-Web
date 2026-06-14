import React from 'react'

const UserCard = ({user}) => {
  const {firstName, lastName, photoUrl, age, gender, skills, about} = user
  return (
    <div className="card bg-base-300 w-96 h-auto shadow-sm">
      <figure>
        <img src={photoUrl} alt="Profile" className="h-64 w-full object-cover" />
      </figure>
      <div className="card-body py-10">
        <h2 className="text-xl">{firstName + " " + lastName}</h2>
        {age && gender && <p className="-mt-2">{age + ", " + gender}</p>}
        {about && <p className="mt-2">{about}</p>}
        <div className="flex justify-center my-10 gap-2">
          <button className="btn bg-blue-600 p-2">Ignore</button>
          <button className="btn bg-green-600 p-2">Send request</button>
        </div>
      </div>
    </div>
  );
}

export default UserCard