import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const Manga = new Mongo.Collection('manga');

Manga.schema = new SimpleSchema({
    name: {type: String},
    url: {type: String, unique: true},
    seen: {type: Boolean, defaultValue: false},
    lastUpdate: {type: Date, defaultValue: new Date()}
});

Manga.attachSchema(Manga.schema);