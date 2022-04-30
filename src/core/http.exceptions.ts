import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginFailed extends HttpException {
  constructor() {
    super(
      {
        message: 'Wrong password or user doesn\'t exist'
      },
      HttpStatus.UNAUTHORIZED
    );
  }
}

export class AlreadyExists extends HttpException {
  constructor() {
    super(
      {
        message: 'Already exists'
      },
      HttpStatus.CONFLICT
    );
  }
}

export class TooManyRequest extends HttpException {
  constructor() {
    super(
      {
        message: 'Too Many Request'
      },
      HttpStatus.TOO_MANY_REQUESTS
    );
  }
}
