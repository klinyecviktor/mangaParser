import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Manga} from "./manga_collection";

export const add_manga = new ValidatedMethod({
    name: "Manga.add_manga",
    validate: null,
    run({url}) {
        Manga.insert({url});
    }
});