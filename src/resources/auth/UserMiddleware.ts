export function UserMiddleware(schema, options): void {
  // tslint:disable-next-line:only-arrow-functions
  schema.pre('validate', (next) => {
    next();
  });

  // tslint:disable-next-line:only-arrow-functions
  schema.pre('save', (next) => {
    next();
  });
}
