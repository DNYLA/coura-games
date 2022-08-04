import { PrismaClient, User } from '.prisma/client';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
const DEFAULT_IMAGE =
  'https://ronaldmottram.co.nz/wp-content/uploads/2019/01/default-user-icon-8.jpg';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  const errorMsg = 'Unable to process request. Try Again!';
  //Check if user already Exists
  let foundUser: User;
  try {
    foundUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    });
  } catch (err) {
    return res.status(500).send({ message: errorMsg });
  }

  if (foundUser) {
    return res.status(403).send({ message: 'Username already exists' });
  }

  //Hash with BCrypt
  let hashedPass;
  try {
    hashedPass = bcrypt.hashSync(password, 12);
  } catch (err) {
    return res.status(500).send({ message: errorMsg });
  }

  if (!hashedPass) return res.status(500).send({ message: errorMsg });

  try {
    await prisma.user.create({
      data: {
        username,
        password: hashedPass,
        avatarUrl: DEFAULT_IMAGE,
      },
    });
  } catch (err) {
    return res.status(500).send({ message: errorMsg });
  }

  //Generate JWT Token

  //Send Back Data
  // return res.status(203).json({
  //   id: newUser.id,
  //   username: newUser.username,
  //   avatarUrl: newUser.avatarUrl,
  // });

  // return res.redirect('login');
  return next();
};

export const logout = async (req: Request, res: Response) => {
  // req.logout();
  res.sendStatus(200);
};

export const user = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return res.status(401).send('Not logged in');

  const { id, username, avatarUrl } = req.user;

  return res.json({ id, username, avatarUrl });
};

export const failed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(401).send('Invalid Credentials');
};
