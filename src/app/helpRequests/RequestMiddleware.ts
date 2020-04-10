export function RequestMiddleware(schema, options): void {
  schema.pre('validate', (next) => {
    console.log(this);
    next();
  });

  schema.pre('save', (next) => {
    console.log(this);
    next();
  });
}
