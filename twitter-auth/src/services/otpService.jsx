export const otpService = {
    generateOTP(length = 6) {
      return Math.floor(100000 + Math.random() * 900000).toString();
    },
  
    verifyOTP(userInput, generatedOTP) {
      return userInput === generatedOTP;
    }
};