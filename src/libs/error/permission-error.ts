class PermissionError extends Error {
  constructor(error: Error, ...args: any[]) {
    super(...args);
    this.name = 'PermissionError';
    this.message = error.message;
  }

  static isError(error: any): error is Error {
    return error instanceof Error;
  }
}

export default PermissionError;
