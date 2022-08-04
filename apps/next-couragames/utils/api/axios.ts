import axios, { AxiosRequestConfig } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { User } from '../../context/auth';
import { getAPIUrl } from '../index'; //Looks weird as just '..' so i added the index part

const CONFIG: AxiosRequestConfig = {
  withCredentials: true,
  baseURL: getAPIUrl(), //returns .ENV variable if not set it throws an error
};
export const AXIOS = axios.create(CONFIG); //Axios Uses .defaults.baseURL to set/call the API this way we can change the API URL outside the library.

export const signIn = (username: string, password: string) =>
  AXIOS.post<User>('/auth/login', { username, password });

export const signOut = () => AXIOS.post('/auth/logout');
export const getUser = () => AXIOS.get(`/auth/user/`);
export const signUp = (username: string, password: string) =>
  AXIOS.post<User>('/auth/signup', { username, password });

export const fetchUser = async (context: GetServerSidePropsContext) => {
  // const headers = validateCookies(context);
  const headers = null;
  console.log(context);
  console.log(headers);
  if (!headers) return { redirect: { destination: '/' } };
  try {
    const { data: guilds } = await axios.get<Guild[]>(`${API_URL}/guilds`, {
      headers,
    });
    console.log(guilds);
    return { props: { guilds } };
  } catch (err) {
    console.log(err);
    return { redirect: { destination: '/' } };
  }
};
