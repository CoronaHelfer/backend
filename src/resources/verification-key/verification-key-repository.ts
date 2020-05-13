export function buildVerificationKeyRepository({ VerificationKeyModel }) {
  const create = async userId => {
    const user = await VerificationKeyModel.create({ userId });

    return user;
  };

  const queryOne = async query => {
    const verificationKey = await VerificationKeyModel.findOne(query);

    return verificationKey;
  };

  return {
    create,
    queryOne,
  };
}

import VerificationKeyModel from './verification-key-model';

export default buildVerificationKeyRepository({ VerificationKeyModel });
