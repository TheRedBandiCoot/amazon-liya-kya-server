import type { Request, Response, NextFunction } from 'express';
import type ErrorHandler from '../utils/utilsClass.js';

type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any | Record<string, number | boolean | string>>>;

export const TryCatch =
  (func: ControllerType) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };

export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message ||= 'internal server error';
  err.statusCode ||= 500;
  // if (err.name === 'MongoServerError' && err.code === 11000) {
  //   err.message = 'Email Already Exists';
  // }
  return res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};
