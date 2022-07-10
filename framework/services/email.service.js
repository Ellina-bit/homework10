import fetch from 'node-fetch';
import urls from '../config/urls';

const verificateUrl = `${urls.apilayer}email_verification/check`;

const Email = {
  verifyByEmailAsync: async(email, apiKey = '') => {
    const response = await fetch(`${verificateUrl}?email=${email}`, { method: 'GET', headers: { apikey: apiKey } });
    return response;
  },
};

export default Email;