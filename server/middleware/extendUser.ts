import { RequestHandler } from 'express';

type likesT = {
  [index:string]: number;
}

let likes:likesT = {};

const addUserInfo: RequestHandler = (req: any, res, next) => {
  if (!req.userContext) {
    return next();
  }

  req.user = {
    liked: likes[req.userContext.userinfo.sub]
  }
  next();
};

export {
  likes,
  addUserInfo
}