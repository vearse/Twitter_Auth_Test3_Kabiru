import React, { useState } from 'react';
import { TwitterLogin } from 'react-twitter-auth';

const TwitterAuthService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTwitterResponse = (response) => {
    response.json().then((user) => {
      if (user) {
        // Store the user information in localStorage
        localStorage.setItem('twitter_user', JSON.stringify(user));

        // Navigate to dashboard or another page
        // You can use React Router's navigate here if needed
        // navigate('/dashboard');
      }
    }).catch((error) => {
      console.error('Error parsing response:', error);
      setError('Authentication failed.');
    });
  };

  const handleTwitterError = (error) => {
    console.error('Twitter Login Error:', error);
    setError('Login failed, please try again.');
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <TwitterLogin
        loginUrl="https://api.twitter.com/oauth/authenticate"
        onFailure={handleTwitterError}
        onSuccess={handleTwitterResponse}
        requestTokenUrl="https://api.twitter.com/oauth/request_token"
        consumerKey={import.meta.env.VITE_TWITTER_CONSUMER_KEY}  
        consumerSecret={import.meta.env.VITE_TWITTER_CONSUMER_SECRET}  
        callbackUrl={import.meta.env.VITE_TWITTER_CALLBACK_URL}  
      />
    </div>
  );
};

export default TwitterAuthService;
