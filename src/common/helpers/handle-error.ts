const handleError = (error: unknown): string => {
  return error instanceof Error ? error.message : String(error);
};

export default handleError;
