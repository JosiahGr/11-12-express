'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import Painting from '../model/painting';
import logger from '../lib/logger';

const jsonParser = bodyParser.json();

const paintingRouter = new Router();

paintingRouter.post('/api/paintings', jsonParser, (request, response) => {
  logger.log(logger.INFO, 'POST - processing a request');
  if (!request.body.name) {
    logger.log(logger.INFO, 'Responding with a 400 error code');
    return response.sendStatus(400);
  }
  return new Painting(request.body).save()
    .then((painting) => {
      logger.log(logger.INFO, 'POST - responding with a 200 status code');
      return response.json(painting);
    })
    .catch((error) => {
      logger.log(logger.ERROR, '__POST_ERROR__');
      logger.log(logger.ERROR, error);
      return response.sendStatus(500);
    });
});

paintingRouter.get('/api/paintings/:id', (request, response) => {
  logger.log(logger.INFO, 'GET - processing a request');

  return Painting.findById(request.params.id)
    .then((painting) => {
      if (!painting) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - (!painting)');
        return response.sendStatus(404);
      }
      logger.log(logger.INFO, 'GET - responding with a 202 status code');
      return response.json(painting);
    })
    .catch((error) => {
      if (error.message.toLowerCase().indexOf('cast to objectid failed') > -1) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - objectId');
        logger.log(logger.VERBOSE, `Could not parse the specific object id ${request.params.id}`);
        return response.sendStatus(404);
      }
      logger.log(logger.ERROR, '__GET_ERROR__ Returning a 500 status code');
      logger.log(logger.ERROR, error);
      return response.sendStatus(500);
    });
});

paintingRouter.get('/api/paintings/', (request, response) => {
  logger.log(logger.INFO, 'GET ALL - processing a request');

  return Painting.find()
    .then((paintingArray) => {
      if (!paintingArray) {
        logger.log(logger.INFO, 'GET ALL - responding with a 404 status code - (!painting)');
        return response.sendStatus(404);
      }
      logger.log(logger.INFO, 'GET ALL - responding with a 202 status code');
      return response.json(paintingArray);
    })
    .catch((error) => {
      logger.log(logger.ERROR, '__GET_ALL_ERROR__ Returning a 500 status code');
      logger.log(logger.ERROR, error);
      return response.sendStatus(500);
    });
});

paintingRouter.delete('/api/paintings/:id', (request, response) => {
  logger.log(logger.INFO, 'DELETE - processing a delete request');

  return Painting.findByIdAndRemove(request.params.id)
    .then((painting) => {
      if (!painting.id) {
        logger.log(logger.INFO, 'DELETE - responding with a 400 status code');
        return response.sendStatus(400);
      }
      if (!painting) {
        logger.log(logger.INFO, 'DELETE - responding with a 404 status code');
        return response.sendStatus(404);
      }
      logger.log(logger.INFO, 'DELETE - responding with a 204 status code');
      return response.sendStatus(204);
    })
    .catch((error) => {
      logger.log(logger.ERROR, '__GET_ERROR__ Returning a 500 status code');
      logger.log(logger.ERROR, error);
      return response.sendStatus(500);
    });
});

export default paintingRouter;
