import React from "react";

const PeopleCard = ({ profileImage, name, username }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center space-y-2">
      <img src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png" alt="Profile" className="w-16 h-16 rounded-full" />
      <div className="font-semibold text-lg">{name}</div>
      <div className="text-gray-500 text-sm">@{username}</div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Follow</button>
    </div>
  );
};

export default PeopleCard;
