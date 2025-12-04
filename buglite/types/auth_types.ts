export type SIGNUP = {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type SIGNIN = {
  email: string;
  password: string;
};

export type SIGNUP_REQUEST = {
  username: string;
  email: string;
  password: string;
};

export type SIGNIN_REQUEST = {
  email: string;
  password: string;
};
