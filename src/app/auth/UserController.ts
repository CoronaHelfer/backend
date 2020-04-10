import RequestService from '../helpRequests/RequestService';
import UserService from './UserService';

class UserController {

  public login(req, res) {
    const body = req.body;
    UserService.isValidUser(body)
      .then((result) => res.status(200).send({token: result}))
      .catch((err) => res.status(500).send({error: err.message}));
  }

  public register(req, res) {
    UserService.create(req.body)
      .then((result) => res.status(201).send({token: result}))
      .catch((err) => res.status(500).send({error: err.message}));
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
}

export default new UserController();
