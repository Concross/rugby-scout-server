'use strict';

import express from 'express';
import modelFinder from '../middleware/modelFinder';
const router = express.Router();

router.param('model', modelFinder);

/***********************************
*     POST REQUESTS                *
************************************/
router.post('/:model', (req, res, next) => {
  let document = new req.model(req.body);

  document.save()
    .then(data => {
      res.send(data);
    })
    .catch(next);
});

/***********************************
*     GET REQUESTS                 *
************************************/
router.get('/hello', (req, res, next) => {
  res.send('hello world');
});

router.get('/:model/:id', (req, res, next) => {
  return req.model.findOne({ _id: req.params.id })
    .then(data => {
      res.send(data);
    });
});


/***********************************
*     PUT REQUESTS                 *
************************************/
router.put('', () => {

});

/***********************************
*     DELETE REQUESTS              *
************************************/
router.delete('', () => {

});

export default router;