import type { NextFunction, Response, Request } from 'express';
import { TryCatch } from '../middlewares/error.js';
import ErrorHandler from '../utils/utilsClass.js';
import { User } from '../models/users.js';

export const adminOnly = TryCatch(async (req, res, next) => {
  const { id } = req.query;
  if (!id) return next(new ErrorHandler('Login First', 401));
  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler('ID Not Found', 401));
  if (user.role !== 'admin')
    return next(new ErrorHandler("You're not admin", 401));
  next();
});
