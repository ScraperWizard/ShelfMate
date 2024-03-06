import React from 'react';
import { useAuth } from '../../../context/AuthProvider';

function LibMain() {
    const {username} = useAuth();
  return (
    <div className="flex justify-center mt-[200px] h-screen" data-name="LibMain">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, {username}!</h1>
        <p className="text-lg">You are logged in as an administrator.</p>
        <p className="text-lg">What would you like to do?</p>
      </div>
    </div>
  );
}

export default LibMain;
