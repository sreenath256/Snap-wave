import React from 'react';
import SignUpForm from '../../components/SignUp/SignUpForm';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="min-h-screen  dark:bg-gray-900 flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Create Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Sign up to access exclusive features and stay updated with the latest news.
          </p>
        </div>
        
        <SignUpForm />

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/sign-in" className="text-blue-600 dark:text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
