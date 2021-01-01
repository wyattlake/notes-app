import { createConnection } from "typeorm";
import dotenv from "dotenv";
import { env } from "process";
import { __prod__ } from "./constants";
import { Note } from "./entities/Note";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { NoteResolver } from "./resolvers/note";
import { User } from "./entities/User";
import { UserResolver } from "./resolvers/user";
import redis from "redis";
import connectRedis from "connect-redis";
import session from "express-session";
import cors from "cors";
import "reflect-metadata";

const main = async () => {
    dotenv.config();

    //Creates a connection to the postgresql database
    await createConnection({
        type: "postgres",
        database: "notes",
        username: env.DB_USERNAME,
        password: env.DB_PASSWORD,
        logging: !__prod__,
        synchronize: true,
        entities: [Note, User],
    });

    const app = express();

    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient();
    app.use(
        cors({
            origin: env.SITE_URL,
            credentials: true,
        })
    );

    //Configures session variables
    app.use(
        session({
            name: "qid",
            store: new RedisStore({
                client: redisClient,
                disableTouch: true,
            }),
            cookie: {
                path: "/",
                maxAge: 315569260000, //10 years
                httpOnly: true,
                sameSite: "lax",
                secure: __prod__,
            },
            secret: env.REDIS_SECRET as string,
            saveUninitialized: true,
            resave: false,
        })
    );

    //Creates an Apollo server and builds schema
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [NoteResolver, UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
    });

    apolloServer.applyMiddleware({ app, cors: false });

    //Listens on server port
    app.listen(env.SERVER_PORT, () => {
        console.log("Server started on port", env.SERVER_PORT);
    });
};

//Logs errors
main().catch((error) => {
    console.log(error);
});
