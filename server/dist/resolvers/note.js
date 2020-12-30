"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteResolver = void 0;
const Note_1 = require("../entities/Note");
const type_graphql_1 = require("type-graphql");
let NoteResolver = class NoteResolver {
    fetchNotes() {
        return Note_1.Note.find();
    }
    fetchNote(id) {
        return Note_1.Note.findOne(id);
    }
    createNote(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return Note_1.Note.create({ title }).save();
        });
    }
    updateNote(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = Note_1.Note.findOne(id);
            if (!note) {
                return undefined;
            }
            if (typeof title !== "undefined") {
                yield Note_1.Note.update({ id }, { title });
            }
            return note;
        });
    }
    deleteNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Note_1.Note.delete(id);
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Note_1.Note]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NoteResolver.prototype, "fetchNotes", null);
__decorate([
    type_graphql_1.Query(() => Note_1.Note, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NoteResolver.prototype, "fetchNote", null);
__decorate([
    type_graphql_1.Mutation(() => Note_1.Note),
    __param(0, type_graphql_1.Arg("title")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NoteResolver.prototype, "createNote", null);
__decorate([
    type_graphql_1.Mutation(() => Note_1.Note, undefined),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("title", () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], NoteResolver.prototype, "updateNote", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NoteResolver.prototype, "deleteNote", null);
NoteResolver = __decorate([
    type_graphql_1.Resolver()
], NoteResolver);
exports.NoteResolver = NoteResolver;
//# sourceMappingURL=note.js.map