interface IResponseError {
  status: number;
  data: string;
}

interface IResponse<T> {
  status: number;
  data?: string | T | T[];
}

export const getMock = <T>(mock: string): T[] => {
  return JSON.parse(localStorage.getItem(mock) ?? "[]");
};

export const saveMock = <T>(mock: string, data: T[]): void => {
  localStorage.setItem(mock, JSON.stringify(data));
};

export const updateMock = <T extends Record<string, any>>(
  data: T[],
  index: string,
  id: string,
  callback: (item: T) => T,
): T[] => data.map(item => (item[index] === id ? callback(item) : item));

export const handleResponse = <T, U extends IResponse<T>>(status: number, data: T | T[]): U =>
  ({status, data}) as unknown as U;

export const createError = (status: number, message: string): IResponseError => ({
  status,
  data: message,
});

export const notFound = createError(404, "Not Found");
export const unauthorized = createError(401, "Unauthorized");
export const forbidden = createError(403, "Forbidden");
