import React from "react";
import { FaUserPlus } from "react-icons/fa";

const peopleList = [
  {
    profileImage: "https://i.pravatar.cc/150?img=1",
    name: "Jane Doe",
    username: "janedoe",
  },
  {
    profileImage: "https://i.pravatar.cc/150?img=2",
    name: "John Smith",
    username: "johnsmith",
  },
  {
    profileImage: "https://i.pravatar.cc/150?img=3",
    name: "Alice Johnson",
    username: "alicej",
  },
  {
    profileImage: "https://i.pravatar.cc/150?img=4",
    name: "Bob Williams",
    username: "bobw",
  },
  // Add more people as needed
];

const PeopleCard = ({ profileImage, name, username }) => (
  <div className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <img src={profileImage} alt={name} className="w-12 h-12 rounded-full object-cover" />
    <div className="ml-3 flex-grow">
      <h3 className="font-semibold text-gray-800 dark:text-white">{name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">@{username}</p>
    </div>
    <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
      <FaUserPlus size={20} />
    </button>
  </div>
);

const RightSidebar = () => {
  return (
    <div className="w-full h-full bg-gray-100 dark:bg-gray-900 p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Find People</h2>
      <div className="space-y-4">
        {peopleList.map((person, index) => (
          <PeopleCard
            key={index}
            profileImage={person.profileImage}
            name={person.name}
            username={person.username}
          />
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;