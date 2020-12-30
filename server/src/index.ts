import { createConnection } from 'typeorm';
import dotenv from 'dotenv'
import { env } from 'process';
import { __prod__ } from './constants';
import { Note } from './entities/Note';
import 'reflect-metadata';

dotenv.config()

const main = async() => {
    const conn = await createConnection({
        type: 'postgres',
        database: 'notes',
        username: env.DB_USERNAME,
        password: env.DB_PASSWORD,
        logging: !__prod__,
        synchronize: true,
        entities: [Note],
    })
}

main();