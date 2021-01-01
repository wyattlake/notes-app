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

    let redisSecret = String(env.REDIS_SECRET);

    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient();
    redisClient.on("connect", function (_) {
        console.log("Connected to redis");
    });

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
                secure: false,
            },
            secret: "secret",
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
        context: ({ req, res }: any) => ({ req, res }),
    });

    apolloServer.applyMiddleware({ app });

    //Listens on port 3000
    app.listen(env.SERVER_PORT, () => {
        console.log("Server started on port", env.SERVER_PORT);
    });
};

//Logs errors
main().catch((error) => {
    console.log(error);
});
