export type APIErrorData = {
  status: string;
  statusCode: number;
  message: string;
};

export default class APIError extends Error {
  status: string;
  statusCode: number;

  constructor({ status, statusCode, message }: APIErrorData) {
    super(message);
    this.status = status;
    this.statusCode = statusCode;
  }
}
