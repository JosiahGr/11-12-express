'use strict';

import faker from 'faker';
import superagent from 'superagent';
import Painting from '../model/painting';
import { startServer, stopServer } from '../lib/server';

const apiURL = `http://localhost:${process.env.PORT}/api/paintings`;

const createPaintingMock = () => {
  return new Painting({
    name: faker.lorem.words(10),
    artist: faker.lorem.words(20),
    style: faker.lorem.words(20),
    era: faker.lorem.words(20),
  }).save();
};

describe('/api/paintings', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(() => Painting.remove({}));
  test('POST - it should respond with a 200 status', () => {
    const paintingToPost = {
      name: faker.lorem.words(10),
      artist: faker.lorem.words(20),
      style: faker.lorem.words(20),
      era: faker.lorem.words(20),
    };
    return superagent.post(apiURL)
      .send(paintingToPost)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(paintingToPost.name);
        expect(response.body.artist).toEqual(paintingToPost.artist);
        expect(response.body.style).toEqual(paintingToPost.style);
        expect(response.body.era).toEqual(paintingToPost.era);
        expect(response.body._id).toBeTruthy();
        expect(response.body.timestamp).toBeTruthy();
      });
  });
  test('POST - It should respond with a 400 status ', () => {
    const paintingToPost = {
      artist: faker.lorem.words(20),
      style: faker.lorem.words(20),
      era: faker.lorem.words(20),
    };
    return superagent.post(apiURL)
      .send(paintingToPost)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
  describe('GET /api/paintings', () => {
    test('should respond with 200 if there are no errors', () => {
      let paintingToTest = null;
      return createPaintingMock()
        .then((painting) => {
          paintingToTest = painting;
          return superagent.get(`${apiURL}/${painting._id}`);
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual(paintingToTest.name);
          expect(response.body.artist).toEqual(paintingToTest.artist);
          expect(response.body.style).toEqual(paintingToTest.style);
          expect(response.body.era).toEqual(paintingToTest.era);
          expect(response.body._id).toBeTruthy();
          expect(response.body.timestamp).toBeTruthy();
        });
    });
    test('should respond with 404 if there is no painting to be found', () => {
      return superagent.get(`${apiURL}/invalidId`)
        .then(Promise.reject)
        .catch((response) => {
          expect(response.status).toEqual(404);
        });
    });
    describe('DELETE /api/paintings', () => {
      test('should respond with 204 if there are no errors', () => {
        let paintingToTest = null;
        return createPaintingMock() 
          .then((painting) => {
            paintingToTest = painting;
            return superagent.delete(`${apiURL}/${painting._id}`);
          })
          .then((response) => {
            expect(response.status).toEqual(204);
            expect(response.body.dinoname).toEqual(paintingToTest.dinoname);
            expect(response.body.dinocontent).toEqual(paintingToTest.dinocontent);
            expect(response.body.dinomite).toEqual(paintingToTest.dinomite);
          });
      });
      test('should respond with 404 if there is no painting to be found', () => {
        return superagent.get(`${apiURL}/ThisIsAnInvalidId`)
          .then(Promise.reject)
          .catch((response) => {
            expect(response.status).toEqual(404);
          });
      });
    });
  });
  describe('PUT /api/paintings', () => {
    test('should update a painting and return a 200 status code', () => {
      let paintingToUpdate = null;
      return createPaintingMock()
        .then((paintingMock) => {
          paintingToUpdate = paintingMock;
          return superagent.put(`${apiURL}/${paintingMock._id}`)
            .send({ name: 'Testing one two three' });
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual('Testing one two three');
          expect(response.body.author).toEqual(paintingToUpdate.author);
          expect(response.body._id).toEqual(paintingToUpdate._id.toString());
        });
    });
  });
});
