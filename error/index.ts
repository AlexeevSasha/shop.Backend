class CustomAPIError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class BadRequestError extends CustomAPIError {
  status: 400;

  constructor(message: string) {
    super(message);
    this.status = 400;
  }
}

export class UnauthenticatedError extends CustomAPIError {
  status: 401;

  constructor(message: string) {
    super(message);
    this.status = 401;
  }
}

export class NotFoundError extends CustomAPIError {
  status: 404;

  constructor(message: string) {
    super(message);
    this.status = 404;
  }
}
