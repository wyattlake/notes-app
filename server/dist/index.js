"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const process_1 = require("process");
const constants_1 = require("./constants");
const Note_1 = require("./entities/Note");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const note_1 = require("./resolvers/note");
const User_1 = require("./entities/User");
const user_1 = require("./resolvers/user");
const redis_1 = __importDefault(require("redis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
require("reflect-metadata");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    dotenv_1.default.config();
    yield typeorm_1.createConnection({
        type: "postgres",
        database: "notes",
        username: process_1.env.DB_USERNAME,
        password: process_1.env.DB_PASSWORD,
        logging: !constants_1.__prod__,
        synchronize: true,
        entities: [Note_1.Note, User_1.User],
    });
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redisClient = redis_1.default.createClient();
    app.use(cors_1.default({
        origin: process_1.env.SITE_URL,
        credentials: true,
    }));
    app.use(express_session_1.default({
        name: "qid",
        store: new RedisStore({
            client: redisClient,
            disableTouch: true,
        }),
        cookie: {
            path: "/",
            maxAge: 315569260000,
            httpOnly: true,
            sameSite: "lax",
            secure: !constants_1.__prod__,
        },
        secret: process_1.env.REDIS_SECRET,
        saveUninitialized: true,
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [note_1.NoteResolver, user_1.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(process_1.env.SERVER_PORT, () => {
        console.log("Server started on port", process_1.env.SERVER_PORT);
    });
});
main().catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map