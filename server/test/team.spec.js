const chai = require('chai');
const request = require('supertest');
const app = require('../app');

const agent = request(app);

chai.should();

describe('Team API', () => {
    describe('GET all team members', () => {
        it('should return a list of team members', (done) => {
            agent.get('/api/users')
              .expect(200, done);
        })
    })
})