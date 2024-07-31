import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <FaSpinner className="animate-spin text-6xl text-blue-500 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        Loading...
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        Please wait while we fetch your content
      </p>
    </div>
  );
};

export default Loading;