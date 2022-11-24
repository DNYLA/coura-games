import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { User } from '../context/auth';
import { getUser, signIn, signOut, signUp } from '../utils/api/axios';

const useAuth = () => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState({ show: false, message: '' });
  const router = useRouter();

  const login = useCallback((username: string, password: string) => {
    signIn(username, password)
      .then(({ data }) => {
        router.push('/');
        setUser(data);
      })
      .catch((err) => {
        const res = err.response;
        if (res.status === 401) {
          console.log('Invalid Credentails');
        }
      });
  }, []);

  const logout = useCallback(() => {
    //Call Logout Endpoint
    signOut()
      .then(() => setUser(undefined))
      .catch(console.error);
  }, []);

  const signup = useCallback((username, password) => {
    signUp(username, password)
      .then(({ data }) => {
        setUser(data);
        router.push('/');
      })
      .catch((err) => {
        const res = err.response;
        console.log(res);
        console.log('Error');
        setError({ show: true, message: res.data.message });
      });
  }, []);

  useEffect(() => {
    // if (user) return; //User already fetched so dont refetch
    // console.log('fetching User');
    getUser()
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, [login, signup]); //Login & Logout only change on mount so this is only called once.

  return { user, login, logout, signup, error, setError };
};

export default useAuth;
