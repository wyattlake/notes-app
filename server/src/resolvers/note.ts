import { Note } from "../entities/Note";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class NoteResolver {
    //Returns all notes
    @Query(() => [Note])
    fetchNotes(): Promise<Note[]> {
        return Note.find();
    }

    //Returns a specific note
    @Query(() => Note, { nullable: true })
    fetchNote(@Arg("id") id: number): Promise<Note | undefined> {
        return Note.findOne(id);
    }

    //Creates a note
    @Mutation(() => Note)
    async createNote(@Arg("title") title: string): Promise<Note> {
        return Note.create({ title }).save();
    }

    //Updates a note
    @Mutation(() => Note, undefined)
    async updateNote(
        @Arg("id") id: number,
        @Arg("title", () => String, { nullable: true }) title: string
    ): Promise<Note | undefined> {
        const note = Note.findOne(id);
        if (!note) {
            return undefined;
        }
        if (typeof title !== "undefined") {
            await Note.update({ id }, { title });
        }
        return note;
    }

    @Mutation(() => Boolean)
    async deleteNote(@Arg("id") id: number): Promise<boolean> {
        await Note.delete(id);
        return true;
    }
}
