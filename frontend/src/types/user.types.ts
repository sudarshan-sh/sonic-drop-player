/* eslint-disable no-unused-vars */
export type User = {
  user?: {
    name: string;
  } | null;
};

export type LoginForm = {
  setUser: (user: User | null) => void;
};
