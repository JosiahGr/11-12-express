'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpErrors from 'http-errors';
import Painting from '../model/painting';
import logger from '../lib/logger';

const jsonParser = bodyParser.json();

const paintingRouter = new Router();

paintingRouter.post('/api/paintings', jsonParser, (request, response, next) => {
  if (!request.body.name) {
    logger.log(logger.INFO, 'Responding with a 400 error code');
    return next(new HttpErrors(400, 'name is required'));
  }
  return new Painting(request.body).save()
    .then((painting) => {
      logger.log(logger.INFO, 'POST - responding with a 200 status code');
      return response.json(painting);
    })
    .catch(next);
});

paintingRouter.put('/api/paintings/:id', jsonParser, (request, response, next) => {
  const options = { runValidators: true, new: true };

  return Painting.findByIdAndUpdate(request.params.id, request.body, options)
    .then((updatedPainting) => {
      if (!updatedPainting) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - (!painting)');
        return next(new HttpErrors(404, 'painting not found'));
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(updatedPainting);
    })
    .catch(next);
});

paintingRouter.get('/api/paintings/:id', (request, response, next) => {
  return Painting.findById(request.params.id)
    .then((painting) => {
      if (!painting) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - (!painting)');
        return next(new HttpErrors(404, 'painting not found'));
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(painting);
    })
    .catch(next);
});

paintingRouter.get('/api/paintings', (request, response, next) => {
  return Painting.find()
    .then((paintingArray) => {
      if (!paintingArray) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - (!painting)');
        return next(new HttpErrors(404, 'painting not found'));
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(paintingArray);
    })
    .catch(next);
});

paintingRouter.delete('/api/paintings/:id', (request, response, next) => {
  return Painting.findByIdAndRemove(request.params.id)
    .then((painting) => {
      if (!painting.id) {
        logger.log(logger.INFO, 'DELETE - responding with a 400 status code');
        return next(new HttpErrors(400, 'painting not found'));
      }
      if (!painting) {
        logger.log(logger.INFO, 'DELETE - responding with a 404 status code');
        return next(new HttpErrors(404, 'painting not found'));
      }
      logger.log(logger.INFO, 'DELETE - responding with a 204 status code');
      return next(new HttpErrors(204, 'no content'));
    })
    .catch(next);
});

export default paintingRouter;
