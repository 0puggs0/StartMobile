import axios, { AxiosInstance, RawAxiosRequestHeaders } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

api.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  },
);

export const get = async (url: string, params?: any) => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('GET error:', error);
    throw error;
  }
};

export const post = async (
  url: string,
  data: any,
  headers?: RawAxiosRequestHeaders,
) => {
  try {
    const response = await api.post(url, data, {
      headers: headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const put = async (
  url: string,
  data: any,
  headers?: RawAxiosRequestHeaders,
) => {
  try {
    const response = await api.put(url, data, { headers: headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patch = async (
  url: string,
  data: any,
  headers: RawAxiosRequestHeaders,
) => {
  try {
    const response = await api.patch(url, data, { headers: headers });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteRequest = async (url: string, data: any) => {
  try {
    const response = await api.delete(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};
