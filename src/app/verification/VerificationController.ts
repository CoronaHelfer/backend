import VerificationService from './VerificationService';

class VerificationController {
  public async verifyMail(req, res) {
    try {
      const result = await VerificationService.verifyMail(req.query.key, req.decoded._id);

      return res.status(200).send({ result });
    } catch (error) {
      if (error.message === '400') {
        return res.status(400).send();
      }

      console.log(error);
      return res.status(500).send();
    }
  }
}

export default new VerificationController();
