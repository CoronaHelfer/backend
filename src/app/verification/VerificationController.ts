import VerificationService from './VerificationService';

class VerificationController {

  public verifyMail(req, res) {
    VerificationService.verifyMail(req.query.key)
      .then((result) => res.status(200).send({result}))
      .catch((err) => res.status(500).send({error: err.message}));
  }
}

export default new VerificationController();
