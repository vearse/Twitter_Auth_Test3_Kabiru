import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TwitterCallback = () => {
  const navigate = useNavigate(); // Used to navigate after successful login

  useEffect(() => {
    // On component mount, handle the Twitter callback
    const handleTwitterCallback = async () => {
      try {
        // Get the Twitter authentication response
        const authResponse = hello.hook('twitter'); // Assuming hello.js is initialized properly

        // Fetch user data from Twitter API
        const response = await hello('twitter').api('me');

        if (!response) {
          throw new Error('Failed to retrieve user information');
        }

        // Store the user information in localStorage
        localStorage.setItem('twitter_user', JSON.stringify(response));

        // Redirect to the dashboard or another page
        navigate('/dashboard', {
          state: {
            userId: response.id,
            screenName: response.name,
          },
        });
      } catch (error) {
        console.error('Twitter Callback Error:', error);

        // On error, navigate to login with the error message
        navigate('/login', {
          state: { error: error.message || 'Authentication failed. Please try again.' },
        });
      }
    };

    handleTwitterCallback(); // Invoke the callback handling function
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-xl">Processing Twitter Authentication...</p>
    </div>
  );
};

export default TwitterCallback;
