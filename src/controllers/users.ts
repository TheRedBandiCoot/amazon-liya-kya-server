import type { NextFunction, Response, Request } from 'express';
import { TryCatch } from '../middlewares/error.js';
import { User } from '../models/users.js';
import ErrorHandler from '../utils/utilsClass.js';

type NewUserRequestBody = {
  name: string;
  email: string;
  photo: string;
  _id: string;
};

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, photo, _id } = req.body;
    let user = await User.findById(_id);

    if (user) {
      return res.status(200).json({
        success: true,
        message: `Welcome back, ${user.name}`
      });
    }

    if (!_id || !name || !email || !photo)
      return next(new ErrorHandler('Please enter All fields', 400));

    user = await User.create({ _id, name, email, photo });

    return res.status(201).json({
      success: true,
      message: `Welcome, ${user.name}`
    });
  }
);
export const getUser = TryCatch(async (req, res, next) => {
  const reqID = req.params.id;

  const user = await User.findById(reqID);
  if (!user)
    return next(
      new ErrorHandler(`No such user found (USER_ID): '${reqID}'`, 404)
    );

  return res.status(201).json({
    success: true,
    user
  });
});
