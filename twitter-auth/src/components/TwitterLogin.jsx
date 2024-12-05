import React, { useState } from 'react';
import  TwitterLogin from 'react-twitter-auth';
import { otpService } from '../services/otpService.jsx';

const TwitterAuth = (props) => {
  const [error, setError] = useState(null);

  // Handle Twitter login response
  const handleTwitterResponse = (response) => {
    response.json().then((user) => {
      if (user) {
        // Generate OTP
        const generatedOTP = otpService.generateOTP();
        
        props.history.push('/verify-otp', { 
          user, 
          otp: generatedOTP 
        });
      }
    }).catch((error) => {
      setError('Error occurred while processing the response');
    });
  };

  // Handle errors during Twitter login
  const handleTwitterError = (error) => {
    // setError('Twitter login failed: ' + error);
    const generatedOTP = otpService.generateOTP();
    props.history.push('/verify-otp', { 
      user: {
        name: 'Kabiru Wahab'
      }, 
      otp: generatedOTP 
    });
  };

  return (
    <div className="flex items-center justify-center h-[400px] w-[500px] bg-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Login with Twitter</h2>
        {error && <p className="text-red-500">{error}</p>}
        <TwitterLogin
            loginUrl="https://api.twitter.com/oauth/authenticate"
            onFailure={handleTwitterError}
            onSuccess={handleTwitterResponse}
            requestTokenUrl="http://localhost:4000/api/request-token"
            consumerKey={import.meta.env.VITE_TWITTER_CONSUMER_KEY}  
            consumerSecret={import.meta.env.VITE_TWITTER_CONSUMER_SECRET}  
            callbackUrl={import.meta.env.VITE_TWITTER_CALLBACK_URL}  
        />
      </div>
    </div>
  );
};

export default TwitterAuth;
