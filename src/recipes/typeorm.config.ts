import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import Recipes from './entities/recipe.entity';

config({ path: '.env' });

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [Recipes],
  synchronize: true,
  logging: false,
};
