export type ErrorResponse = {
  error: string;
};

export class RequestError extends Error {
  readonly request: ErrorResponse;

  constructor(request: ErrorResponse) {
    super('Request error');
    this.name = 'RequestError';
    this.request = request;
  }
}
