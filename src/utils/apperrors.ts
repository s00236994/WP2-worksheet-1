export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message);
    this.name = this.constructor.name;

  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public details?: unknown) {
    super(message, 400);
  } 
}

export class UserAlreadyExistsError extends AppError {
  constructor() {
    super('User already exists', 409);
  }
}

export class UnauthorizedError  extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}

