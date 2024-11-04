export default () => ({
  port: Number(process.env.PORT) || 3000,
  backendPrefix: process.env.BACKEND_PREFIX,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  pgHost: process.env.PGHOST,
  pgPort: process.env.PGPORT,
  pgUsername: process.env.PGUSERNAME,
  pgUserPassword: process.env.PGUSERPWD,
  pgDatabase: process.env.PGDATABASE,
});
