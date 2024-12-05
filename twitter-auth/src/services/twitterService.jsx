import axios from 'axios';

export const twitterService = {
  async initiateTwitterLogin() {
    try {
      const response = await axios.get('/api/twitter/login');
      return response.data;
    } catch (error) {
      console.error('Twitter login error:', error);
      throw error;
    }
  },

  async sendDirectMessage(userId, otp) {
    try {
      const response = await axios.post('/api/twitter/dm', { 
        userId, 
        message: `Your OTP is: ${otp}` 
      });
      return response.data;
    } catch (error) {
      console.error('Error sending DM:', error);
      throw error;
    }
  },

  async verifyTwitterCredentials(userId) {
    try {
      const response = await axios.get(`/api/twitter/verify/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Credential verification error:', error);
      throw error;
    }
  }
};