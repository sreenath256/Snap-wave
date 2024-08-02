import React from 'react'
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    const isAuthenticated = false;
  return (
    <>
    {isAuthenticated ? (
      <Navigate to="/" />
    ) : (
      <>
        <section className="flex flex-1 justify-center items-center flex-col py-10 bg-white dark:bg-gray-900 ">
          <Outlet />
        </section>

       
      </>
    )}
  </>
  )
}

export default AuthLayout
