import React from "react";
import { FaHome, FaSearch, FaUsers, FaBookmark, FaPlusSquare } from "react-icons/fa";
import { useSelector } from "react-redux";
import { baseImgUrl } from '../../constance'

const LeftSidebar = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-6 h-screen flex flex-col transition-colors duration-200">
      <div className="flex items-center mb-10">
        <img 
          src={baseImgUrl+user.picturePath || 'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png'} 
          alt="Profile" 
          className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
        />
        <div className="ml-4">
          <div className="font-bold text-xl">{user.firstName + ' ' + user.lastName}</div>
          <div className="text-blue-600 dark:text-blue-400 text-sm">@{user.firstName}</div>
        </div>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-6">
          {[
            { icon: FaHome, text: "Home" },
            { icon: FaSearch, text: "Search" },
            { icon: FaUsers, text: "People" },
            { icon: FaBookmark, text: "Saved" },
            { icon: FaPlusSquare, text: "Create Post" },
          ].map((item, index) => (
            <li key={index} className="group">
              <a href="#" className="flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-blue-600">
                <item.icon className="text-2xl text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-white" />
                <span className="font-medium group-hover:text-blue-600 dark:group-hover:text-white">{item.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default LeftSidebar;