import axios from 'axios';

import { BACKEND_URL } from '../constant';

export const getAllTasks = async (timeframe) => {
    console.log(localStorage.getItem('token'))

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in local storage');
      return;
    }
   
    console.log(timeframe)

  try {
    const headers = {
      Authorization: `${token}`,
    };
    const response = await axios.get(`${BACKEND_URL}/api/tasks?filter=${timeframe}`,{headers});
    console.log(response.data)
    return response; // Return only data from the response
  } catch (error) {
   
    return error;
  }
};
