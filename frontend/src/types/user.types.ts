/* eslint-disable no-unused-vars */
export type User = {
  name: string;
} | null;

export type LoginForm = {
  setUser: (user: User | null) => void;
};
