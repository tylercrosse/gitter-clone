import request from 'supertest';
import mongoose from 'mongoose';
import { server } from './server';

describe('express serving', () => {
  describe('routing', () => {
    afterAll(() => {
      mongoose.connection.close();
      server.close();
    });

    it('should respond to / with the index.html', () => {
      return request(server)
        .get('/')
        .expect(200)
        .expect((res) => expect(res.text).toContain('<div id="root"></div>'));
    });

    it('should respond to /api/messages with json', () => {
      return request(server)
        .get('/api/messages')
        .expect(200)
        .expect('Content-Type', /json/);
    });
  });
});
