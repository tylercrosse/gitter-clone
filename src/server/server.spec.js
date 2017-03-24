import request    from 'supertest';
import mongoose   from 'mongoose';
import Convo      from './models/Convo';
import { server } from './server';

jest.mock('./config/logger');

describe('express serving', () => {
  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });

  describe('routing', () => {
    it('should respond to / with the index.html', () => {
      return request(server)
        .get('/')
        .expect(200)
        .expect((res) => expect(res.text).toContain('<div id="root"></div>'));
    });

    it('should respond to /api/messages with json', () => {
      const name = 'chat';
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };
      return Convo.findOneAndUpdate({ name }, {}, options)
        .then(() => {
          return request(server)
            .get('/api/messages/' + name)
            .expect(200)
            .expect('Content-Type', /json/);
        });
    });

    it('should respond to /api/convos with json', () => {
      return request(server)
        .get('/api/convos')
        .expect(200)
        .expect('Content-Type', /json/);
    });

    it('should respond to /* with the index.html', () => {
      return request(server)
        .get('/foo/bar')
        .expect(200)
        .expect((res) => expect(res.text).toContain('<div id="root"></div>'));
    });
  });

  it('should log an error if app.listen fails', () => {

  });
});
