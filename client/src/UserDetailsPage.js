import React from "react";
import { useLocation } from "react-router-dom";

const UserDetailsPage = () => {
  const location = useLocation();
  const { userData } = location.state;

  if (!userData) {
    return <div>No user data found</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>
        Name: {userData.firstName} {userData.lastName}
      </p>
      <p>Address: {userData.address}</p>
      <p>Phone Number: {userData.phoneNumber}</p>
      <p>Age: {userData.age}</p>
      <p>Gender: {userData.gender}</p>
    </div>
  );
};

export default UserDetailsPage;
