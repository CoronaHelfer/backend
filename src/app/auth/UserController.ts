import RequestService from '../helpRequests/RequestService';
import UserService from './UserService';

class UserController {

  public login(req, res) {
    UserService
    .isValidUser(req.body)
    .then((result) => res.status(200).send({ token: result }))
    .catch((error) => {
      if (error.message === '401') {
        return res.status(401).send({ message: 'Invalid credentials' });
      }

      if (error.message === '404') {
        return res.status(404).send({ message: 'No user found for this email address' });
      }

      return res.status(500).send();
    });
  }

  public register(req, res) {
    UserService.create(req.body, req.headers.origin)
    .then((result) => res.status(201).send({token: result}))
    .catch((error) => {
      console.log(error);

      if (error.message === '400') {
        return res.status(400).send({ message: 'No email address or phone number provided' });
      }

      res.status(500).send();
    });
  }

  // public search(req, res) {
  //     UserService.findOne({})
  //         .then((result) => res.status(200).send({users: result}))
  //         .catch((err) => res.status(500).send({error: err.message}));
  // }

  public didExist(id: string): Promise<boolean> {
    return new Promise((res, rej) => {
      UserService.findOne({_id: id})
        .then((result) => {
          if (result) {
            res(true);
          } else {
            res(false);
          }
        })
        .catch((err) => res(false));
    });
  }

  public me(req, res) {
    UserService.findOne({_id: req.decoded._id})
      .then((result) => res.status(200).send({user: result}))
      .catch((err) => res.status(500).send({error: err.message}));
  }

  public async getOtherUser(req, res) {
    const userId = req.body.userId;
    let found = false;

    // see details of confirmed helper from your request
    let requests = await RequestService.getOwn(req.decoded._id);
    for (const r of requests) {
      if (r.confirmed_helper._id.toString() === userId) {
        found = true;
        break;
      }
    }

    // see details from request owner when you are confirmed
    requests = await RequestService.find({'helper.helperId': req.decoded._id}, req.decoded._id);
    for (const r of requests) {
      const u = r.created_by._id.toString();
      if (u === userId) {
        found = true;
        break;
      }
    }

    if (!found) {
      res.status(403).send({error: 'No permission to see details from this user'});
      return;
    }

    UserService.findOne({_id: userId})
      .then((result) => res.status(200).send({user: result}))
      .catch((err) => res.status(500).send({error: err.message}));
  }

  public delete(req, res) {
    UserService.delete()
      .then((result) => res.status(200).send({result}))
      .catch((err) => res.status(500).send({error: err.message}));
  }

  public saveFcmToken(req, res) {
    UserService.saveFcmToken(req.body.fcmToken)
      .then((result) => res.status(200).send({}))
      .catch((err) => res.status(500).send({error: err.message}));
  }

  public changeProfileInformation(req, res) {
    UserService.updateProfile(req.body.city, req.body.street, req.body.street_nr,
      req.body.plz, req.body.picture, req.decoded._id)

      .then((result) => res.status(200).send({result}))
      .catch((err) => res.status(500).send({error: err.message}));
  }
}

export default new UserController();
