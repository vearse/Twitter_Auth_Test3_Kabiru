const express = require('express');
const axios = require('axios');
const qs = require('qs');
const cors = require('cors');
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const TWITTER_API_URL = 'https://api.twitter.com/oauth/request_token';
const CALLBACK_URL = process.env.TWITTER_CALLBACK_URL;


const generateOAuthSignature = (params, consumerSecret) => {
  const encodedParams = Object.keys(params)
    .sort()
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  const signatureBase = `POST&${encodeURIComponent(TWITTER_API_URL)}&${encodeURIComponent(encodedParams)}`;
  const signingKey = `${encodeURIComponent(consumerSecret)}&`;
  
  return crypto
    .createHmac('sha1', signingKey)
    .update(signatureBase)
    .digest('base64');
};


app.post('/api/request-token', async (req, res) => {
  const consumerKey = process.env.TWITTER_CONSUMER_KEY;
  const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;

  const oauthParams = {
    oauth_callback: CALLBACK_URL,
    oauth_consumer_key: consumerKey,
    oauth_nonce: crypto.randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_version: '1.0',
  };
  
  oauthParams.oauth_signature = generateOAuthSignature(oauthParams, consumerSecret);

  const authHeader = `OAuth ${Object.keys(oauthParams)
    .map(key => `${encodeURIComponent(key)}="${encodeURIComponent(oauthParams[key])}"`)
    .join(', ')}`;

  try {
    const response = await axios.post(TWITTER_API_URL, null, {
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log(response.data);
    res.json(qs.parse(response.data));
  } catch (error) {
    console.error('Twitter API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch request token' });
  }
});


const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
