import { createConnection } from "typeorm";
import dotenv from "dotenv";
import { env } from "process";
import { __prod__ } from "./constants";
import { Note } from "./entities/Note";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { NoteResolver } from "./resolvers/note";
import { User } from "./entities/User";
import { UserResolver } from "./resolvers/user";

dotenv.config();

const main = async () => {
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

    //Creates an Apollo server and builds schema
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [NoteResolver, UserResolver],
            validate: false,
        }),
    });

    apolloServer.applyMiddleware({ app });

    //Listens on port 3000
    app.listen(3000, () => {
        console.log("Server started on port 3000");
    });
};

//Logs errors
main().catch((error) => {
    console.log(error);
});
