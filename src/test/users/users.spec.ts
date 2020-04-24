import {
  defaultUserData,
  expect,
  loginWithDefaultUser,
  registerDefaultUser,
  request,
  should,
} from './shared.spec';

let jwtToken;

describe('# Project Auth APIs', () => {
  it('User should able to register', (done) => {
    registerDefaultUser()
      .then(() => done())
      .catch((err) => done(err));
  });

  it('User should able to login', (done) => {
    loginWithDefaultUser()
      .then((res) => {
        jwtToken = res.body.token;
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it('User Should not get users list', (done) => {
    request.get(process.env.API_BASE + '/users')
      .expect(403)
      .expect((res) => {
        should.exist(res.body);
        expect(res.body).to.be.a('object');
        res.body.should.have.property('reason');
        done();
      }).catch((err) => done(err));
  });

  it('User Should get users list', (done) => {
    request.get(process.env.API_BASE + '/users')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .expect((res) => {
        should.exist(res.body);
        expect(res.body).to.be.a('object');
        res.body.should.have.property('users');
        const users = res.body.users;
        expect(users).to.be.a('array').with.lengthOf(1);
        const userName = users[0].userName;
        userName.should.equal(defaultUserData.userName);
        done();
      }).catch((err) => done(err));
  });
});
