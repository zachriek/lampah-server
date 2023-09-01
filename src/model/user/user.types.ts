export type TCreateUser = {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
};

export type TAuthorizeUser = {
  username: string;
  password: string;
};

export type TEditUser = {
  name: string;
  username: string;
  email: string;
  phone: string;
};
