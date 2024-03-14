import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
  // Puerto por default
  PORT: get('PORT').required().asPortNumber(),
  // Url de mongodb conexion a la BD
  MONGO_URL: get('MONGO_URL').required().asString(),
  // Nombre de la BD de MONGODB
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
  // JWT_SEED
  JWT_SEED: get('JWT_SEED').required().asString(),
  // titan mailer configuration
  MAILER_HOST: get('MAILER_HOST').required().asString(),
  MAILER_PORT: get('MAILER_PORT').required().asPortNumber(),
  MAILER_SECURE: get('MAILER_SECURE').required().asBool(),
  MAILER_AUTH_USER: get('MAILER_AUTH_USER').required().asString(),
  MAILER_AUTH_PASSWORD: get('MAILER_AUTH_PASSWORD').required().asString(),
}



