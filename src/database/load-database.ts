import { fromPairs } from 'ramda';

export default async function loadDatabase(modelsList, seedPath) {
  await Promise.all(Object.values(modelsList).map((Model: any) => Model.deleteMany()));

  const seed = require(seedPath);

  return fromPairs(
    await Promise.all(
      Object.entries(seed)
      .map(async ([modelName, entities]) => {
        const Model = modelsList[modelName];

        return await Promise.all((entities as []).map(async (entity) => {
          return (await Model.create(entity)).toJSON();
        }));
      }),
    ),
  );
}
