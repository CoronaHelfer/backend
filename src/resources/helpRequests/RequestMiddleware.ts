export function RequestMiddleware(schema, options): void {
  schema.pre('validate', (next) => {
    next();
  });

  schema.pre('save', (next) => {
    next();
  });
}
