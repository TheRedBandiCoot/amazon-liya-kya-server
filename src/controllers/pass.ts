import type { NextFunction, Response, Request } from 'express';
import { TryCatch } from '../middlewares/error.js';
import ErrorHandler from '../utils/utilsClass.js';
import { Pass } from '../models/pass.js';

type NewPassRequestBody = {
  name?: string;
  dob: Date;
};

export const newPass = TryCatch(
  async (
    req: Request<{}, {}, NewPassRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, dob } = req.body;
    if (!name || !dob)
      return next(new ErrorHandler('Please enter All fields', 400));

    const pass = await Pass.create({ name, dob });

    return res.status(201).json({
      success: true,
      message: `created : ${pass.name}`
    });
  }
);
export const getAllPass = TryCatch(async (req, res, next) => {
  const pass = await Pass.find({});

  return res.status(201).json({
    success: true,
    pass
  });
});
export const getUserPass = TryCatch(
  async (
    req: Request<{}, {}, NewPassRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { dob } = req.query;

    let pass: { name: string; dob: string }[] = [];
    if (dob) {
      pass = await Pass.find({ dob });
    }
    // console.log(pass);
    if (pass.length < 1)
      return res.status(201).json({
        success: false
      });

    return res.status(201).json({
      success: true
    });
  }
);
