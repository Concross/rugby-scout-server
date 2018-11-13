'use strict';

import User from './user';
import express from 'express';
import auth from './middleware';
import authorize from './lib/oauth';

const authRouter = express.Router();

authRouter.post('/register', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then(user => {
      res.send(user.generateToken());
    })
    .catch(next);
});

authRouter.get('/signin', auth, (req, res, next) => {
  res.cookie('token', req.token);
  res.send(req.token);
});

authRouter.get('/oauth', (req, res, next) => {
  authorize(req)
    .then(token => {
      res.cookie('token', token);
      res.send(req.token);
    })
    .catch(err => console.error(err));
});
export default authRouter;
