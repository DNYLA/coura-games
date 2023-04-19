import { UpdateUser, User } from '@couragames/shared-types';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import {
  getUser,
  signIn,
  signOut,
  signUp,
  updateUser as updateUserEndpoint,
} from '@couragames/ui';

const useAuth = () => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState({ show: false, message: '' });
  const [loading, setLoading] = useState(true);
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
          console.log('error');
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
        setError({ show: true, message: res.data.message });
      });
  }, []);

  const updateUser = useCallback(
    (username: string, data: UpdateUser, image?: File) => {
      updateUserEndpoint(username, data, image)
        .then(({ data }) => {
          setUser(data);
        })
        .catch((err) => {
          const res = err.response;
          if (res.status === 403 || res.stats === 500) {
            //Set Error Message
          }
        });
    },
    []
  );

  useEffect(() => {
    // if (user) return; //User already fetched so dont refetch
    // console.log('fetching User');
    getUser()
      .then(({ data }) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [login, signup]); //Login & Logout only change on mount so this is only called once.

  return { user, login, logout, signup, updateUser, error, setError, loading };
};

export default useAuth;
