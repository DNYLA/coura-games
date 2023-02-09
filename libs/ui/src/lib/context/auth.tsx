/* eslint-disable @typescript-eslint/no-empty-function */
import { UpdateUser, User } from '@couragames/shared-types';
import { createContext, Dispatch, SetStateAction } from 'react';

export type AlertNotification = {
  show: boolean;
  message: string;
};

type UserConextType = {
  isLoggedIn: boolean;
  user: User | undefined;
  alertMsg: AlertNotification;
  login: (username: string, password: string) => void;
  signup: (username: string, password: string) => void;
  updateUser: (username: string, data: UpdateUser, image?: File) => void;
  setAlert: Dispatch<SetStateAction<AlertNotification>>;
  resetAlert: () => void;
  logout: () => void;
};

export const UserContext = createContext<UserConextType>({
  isLoggedIn: false,
  user: undefined,
  alertMsg: { show: false, message: '' },
  login: () => {},
  signup: () => {},
  updateUser: () => {},
  setAlert: () => {},
  resetAlert: () => {},
  logout: () => {},
});

type IUserConextType = {
  user?: User;
  setUser: Dispatch<SetStateAction<User>>;
};

export const IUserContext = createContext<IUserConextType>({
  setUser: () => {},
});
