/* eslint-disable @typescript-eslint/no-namespace */
import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { NextFunction, Request, Response } from 'express';
import { User } from '../modules/user/user.model';
import { TUserRole } from '../modules/user/user.interface';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // check if the token is send from the client
    if (!token)
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );

    // check if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    //   checking if the user is exist
    const user = await User.isUserExist(decoded?.email);

    if (!user)
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    if (requiredRoles && !requiredRoles.includes(decoded?.role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
