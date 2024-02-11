export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/g.test(email);
};

export const isValidName = (name: string): boolean => {
  if (!name) return false;
  return name.length >= 3;
};

export const isValidPassword = (password: string, repeatpassword?: string): boolean => {
  if (!password || password.length < 6) return false;
  if (repeatpassword && repeatpassword !== password) return false;
  return true;
};

export const isValidCode = (code: string): boolean => {
  if (!code) return false;
  return /^\d{6}$/.test(code);
};
