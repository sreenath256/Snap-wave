import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { PeopleCard } from "../../components/Cards/PeopleCard";
import api from "../../utils/axios";
import { baseImgUrl } from "../../constance";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPeople, setFilteredPeople] = useState([]);
  const handleSearch = async (event) => {
    try {
      const name = event.target.value;
      console.log(name);
      if (name != "") {
        const response = await api.get(`users/search/${name}`);
        setFilteredPeople(response.data);
        setSearchTerm(name);

        console.log(filteredPeople);
      } else {
        setFilteredPeople([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white  text-gray-900 w-4/5 min-h-screen p-4 transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">People</h1>
      </div>

      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search people..."
          onChange={handleSearch}
          className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-700  bg-white text-gray-900 border-gray-400 border rounded-full py-2 px-4 pl-10 focus:outline-none focus:border-blue-500 transition-colors duration-300"
        />
        <FaSearch
          className={`absolute left-3 top-3  dark:text-gray-400text-gray-600'}`}
        />
      </div>
      {searchTerm !== "" && (
        <div className="flex flex-col  justify-center">
          {filteredPeople.map((person) => (
            <>
              <PeopleCard
                key={person._id}
                
                person={person}
              />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
