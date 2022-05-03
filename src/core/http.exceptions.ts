import { HttpException, HttpStatus } from '@nestjs/common';

export class ImportException extends HttpException {
  constructor(private error: any) {
    super(
      {
        error,
        msg: 'Provided files contain errors'
      },
      HttpStatus.BAD_REQUEST
    );
  }
}

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

export class UnauthorizedAccess extends HttpException {
  constructor() {
    super(
      {
        message: 'Unauthorized access'
      },
      HttpStatus.BAD_REQUEST
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
