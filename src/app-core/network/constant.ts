enum EApiErrorCode {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  UnprocessableEntity = 422,
  TooManyRequests = 429,
  InternalServerError = 500,
}

export {EApiErrorCode};
