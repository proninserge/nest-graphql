import { DataSource, DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}']
};

export const dataSource = new DataSource(config);

dataSource.initialize();

export default config;