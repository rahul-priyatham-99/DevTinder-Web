import React from 'react'

const UserCard = ({user}) => {
  const {firstName, lastName, photoUrl, age, gender, skills, about} = user
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={photoUrl}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <div className="flex justify-center my-4 gap-2">
          <button className="btn bg-blue-600 p-2">Ignore</button>
          <button className="btn bg-green-600 p-2">Send request</button>
        </div>
      </div>
    </div>
  );
}

export default UserCard