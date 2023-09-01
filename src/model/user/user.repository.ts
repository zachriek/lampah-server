import { PrismaClient } from '@prisma/client';
import { TCreateUser, TEditUser } from './user.types';

const prisma = new PrismaClient();

export const insertUser = async (userData: TCreateUser) => {
  const { name, username, email, phone, password } = userData;

  const user = await prisma.user.create({
    data: { name, username, email, phone, password },
  });

  return user;
};

export const findUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({ where: { username } });
  return user;
};

export const findUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
};

export const updateUserById = async (id: string, userData: TEditUser) => {
  const { name, email, phone } = userData;
  const user = await prisma.user.update({ where: { id }, data: { name, username: userData.username, email, phone } });
  return user;
};
