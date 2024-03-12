import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
  // Puerto por default
  PORT: get('PORT').required().asPortNumber(),
  // Url de mongodb conexion a la BD
  MONGO_URL: get('MONGO_URL').required().asString(),
  // Nombre de la BD de MONGODB
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),

}



