import Environment from '../../config/environments';
import RequestService from '../helpRequests/RequestService';
import HelperService from './HelperService';

const config = Environment;

class HelperController {

  public offerHelp(req, res) {
    const body = req.body;
    HelperService.addHelper(body, req.decoded._id)
      .then((result) => res.status(200).send({result}))
      .catch((err) => res.status(500).send({error: err.message}));
  }

  public confirmHelp(req, res) {
    const body = req.body;
    HelperService.confirmHelper(body.helperId, req.decoded._id, body.requestId)
      .then((result) => res.status(200).send({result}))
      .catch((err) => res.status(500).send({error: err.message}));
  }

  public getListOfOwnHelps(req, res) {
    const userId = req.decoded._id;
    RequestService.find({'helper.helperId': userId}, userId)
      .then((result) => res.status(200).send({result}))
      .catch((err) => res.status(500).send({error: err.message}));
  }

}

export default new HelperController();
