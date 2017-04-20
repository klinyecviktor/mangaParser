import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {parser} from "/imports/api/parser"

export const Manga = new Mongo.Collection('manga');

Manga.schema = new SimpleSchema({
    name: {type: String},
    url: {type: String, unique: true},
    seen: {type: Boolean, defaultValue: false},
    lastUpdate: {type: Date, defaultValue: new Date(1900)}
});

Manga.attachSchema(Manga.schema);

Manga.helpers({
    parse() {
        if (Meteor.isServer) {
            const manga = Manga.findOne({_id: this._id});


            return new Promise((resolve, reject) => {
                parser(manga.url).then((resultDate) => {
                    if (resultDate > manga.lastUpdate)
                        Manga.update({_id: manga._id}, {
                            $set: {
                                lastUpdate: resultDate,
                                seen: false
                            }
                        }, function (err, done) {
                            err && reject(err);

                            resolve();
                        });
                    else resolve()

                }).catch((err) => {
                    reject(`${manga.name}, ${err}`);
                })
            });
        }
    }
});