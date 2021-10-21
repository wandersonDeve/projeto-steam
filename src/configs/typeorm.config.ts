import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'lavoisier50331',
  database: 'steam_project',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
