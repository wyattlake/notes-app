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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const note_1 = require("./resolvers/note");
dotenv_1.default.config();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield typeorm_1.createConnection({
        type: "postgres",
        database: "notes",
        username: process_1.env.DB_USERNAME,
        password: process_1.env.DB_PASSWORD,
        logging: !constants_1.__prod__,
        synchronize: true,
        entities: [Note_1.Note],
    });
    const app = express_1.default();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [note_1.NoteResolver],
            validate: false,
        }),
    });
    apolloServer.applyMiddleware({ app });
    app.listen(3000, () => {
        console.log("Server started on port 3000");
    });
});
main().catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map