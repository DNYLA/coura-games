import { objectFilter } from '@chakra-ui/utils';
import {
  Comment,
  Comments,
  PublicUser,
  UpdateUser,
  User,
} from '@couragames/shared-types';
import axios, { AxiosRequestConfig } from 'axios';
import { GetServerSidePropsContext } from 'next';

const getAPIUrl = () => {
  const url = process.env['NX_API_URL'];
  if (!url) throw 'API URL not defined';

  return url;
};

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

export const fetchUserProfile = (username: string) =>
  AXIOS.get<PublicUser>(`/member/${username}`);

export const updateUser = (
  username: string,
  data: UpdateUser,
  image?: File
) => {
  const formData = new FormData();
  if (image) formData.append('avatar', image, image.name);
  Object.keys(data).forEach((k) => {
    const value = data[k as keyof UpdateUser];
    formData.append(k, value ?? '');
  });

  return AXIOS.patch<PublicUser>(
    `/member/${username.toLowerCase()}`,
    formData,
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );
};

export const fetchComments = (username: string, page?: number) =>
  AXIOS.get<Comments>(`/member/${username}/comment?page=${page ?? 0}`);

export const postComment = (username: string, message: string) =>
  AXIOS.post<Comment>(`/member/${username}/comment`, { message });

export const deleteComment = (username: string, id: number) =>
  AXIOS.delete<void>(`/member/${username}/comment?id=${id}`);
