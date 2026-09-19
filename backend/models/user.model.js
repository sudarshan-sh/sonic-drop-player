// Shape of a user as exposed outside the backend. Never includes the password hash.
export const toPublicUser = (user) => {
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};
