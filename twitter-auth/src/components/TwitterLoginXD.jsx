import React, { useState } from 'react';
import TwitterAuthService from '../services/TwitterAuthService.jsx';

const TwitterLoginOld = () => {
  const [error, setError] = useState(null);

  const handleTwitterLogin = async () => {
    try {
      const response = await TwitterAuthService.initiateTwitterLogin();
      console.log('Login Success:', response);
    } catch (error) {
    setError('Failed to initiate Twitter login. Please try again.');
      console.error('Login Failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-[500px] bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Login with Twitter</h2>
      <button
        onClick={handleTwitterLogin}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Login with Twitter
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div> 
  );
};

export default TwitterLoginOld;

