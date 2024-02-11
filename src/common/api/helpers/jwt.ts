export const parseExpirationTime = (expirationTime: string): number => {
  const value = parseInt(expirationTime.slice(0, -1));
  if (isNaN(value)) return 86400;
  switch (expirationTime.slice(-1)) {
    case "s":
      return value;
    case "m":
      return value * 60;
    case "h":
      return value * 3600;
    case "d":
      return value * 86400;
    default:
      return 86400;
  }
};

export const generateJWT = (userId: string): string => {
  const expirationTime = new Date(
    new Date().getTime() + parseExpirationTime(String(process.env.REACT_APP_JWT_EXPIRATIONTIME)) * 1000,
  ).getTime();
  return btoa(`${process.env.REACT_APP_JWT_SECRET}&${expirationTime}&${userId}`);
};

export const verifyJWT = (token: string): {id: string} => {
  let t = token;
  if (t.includes('"')) t = t.replace(/"/g, "");
  const splited = atob(t).split("&");
  const expirationTime = parseInt(splited[1]);
  if (!isNaN(expirationTime) && expirationTime >= new Date().getTime()) {
    return {id: splited[2]};
  }
  return {id: ""};
};
