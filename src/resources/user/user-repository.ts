export function buildUserRepository({ UserModel }) {
  const create = async profile => {
    const user = await UserModel.create(profile);

    return user;
  };

  const queryOne = async query => {
    const user = await UserModel.findOne(query);

    return user;
  };

  return {
    create,
    queryOne,
  };
}

// Build the repository by injecting the model
import UserModel from './user-model';

export default buildUserRepository({ UserModel });
