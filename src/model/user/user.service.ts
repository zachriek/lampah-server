import { comparePassword, hashPassword } from '../../libs/bcrypt';
import { findUserById, findUserByUsername, insertUser, updateUserById } from './user.repository';
import { TAuthorizeUser, TCreateUser, TEditUser } from './user.types';

export const createUser = async (userData: TCreateUser) => {
  const existingUser = await findUserByUsername(userData.username);
  if (existingUser) throw Error('Username taken');

  const hashedPassword = await hashPassword(userData.password);
  userData.password = hashedPassword;
  const user = await insertUser(userData);

  return user;
};

export const getUserByUsername = async (username: string) => {
  const user = await findUserByUsername(username);
  if (!user) throw Error('Username does not exist');
  return user;
};

export const getUserById = async (id: string) => {
  const user = await findUserById(id);
  if (!user) throw Error('User does not exist');
  return user;
};

export const authorizeUser = async (userData: TAuthorizeUser) => {
  const user = await getUserByUsername(userData.username);
  if (!user) throw Error('Username does not exist');

  const isCorrectPassword = await comparePassword(userData.password, user.password);
  if (!isCorrectPassword) throw Error('Incorrect password');

  return user;
};

export const editUserById = async (id: string, userData: TEditUser) => {
  const findUser = await getUserById(id);
  if (!findUser) throw Error('Username does not exist');

  const user = await updateUserById(id, userData);
  return user;
};
