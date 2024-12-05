import React, { useState } from 'react';
import { otpService } from '../services/otpService';

function OTPVerification(props) {
  const [otp, setOTP] = useState('');
  const [error, setError] = useState(null);
  
  // Get state passed from Twitter login
  const { user, otp: generatedOTP } = props.location.state || {};

  const handleOTPVerification = () => {
    if (!generatedOTP) {
      setError('No OTP generated. Please login again.');
      return;
    }

    if (otpService.verifyOTP(otp, generatedOTP)) {
      
      localStorage.setItem('twitter_user', JSON.stringify(user));
      
      props.history.push('/dashboard');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-[500px] bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
      <input 
        type="text" 
        value={otp} 
        onChange={(e) => setOTP(e.target.value)} 
        placeholder="Enter OTP"
        className="px-4 py-2 border rounded w-64 mb-4"
      />
      <button 
        onClick={handleOTPVerification} 
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Verify OTP
      </button>
      <small>{generatedOTP}</small>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default OTPVerification;