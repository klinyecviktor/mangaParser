import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const ParsedData = new Mongo.Collection('parsedData');

ParsedData.schema = new SimpleSchema({
    category: {type: String},
    count: {type: Number, defaultValue: 0},
    parsed: {type: Number, defaultValue: 0},
    isParsing: {type: Boolean, defaultValue: false}
});

ParsedData.attachSchema(ParsedData.schema);