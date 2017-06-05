import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Manga} from "./manga_collection";
import {ParsedData} from "../parsedData/parsedData_collection"
import {CronJob} from "cron"

export const add_manga = new ValidatedMethod({
    name: "Manga.add_manga",
    validate: null,
    run({name, url}) {
        const id = Manga.insert({name, url});

        ParsedData.update({category: 'manga'}, {$set: {count: Manga.find().count()}});

        if (Meteor.isServer) {
            Manga.findOne(id).parse();
        }
    }
});

export const refresh_all = new ValidatedMethod({
    name: "Manga.refresh_all",
    validate: null,

    run() {
        if (Meteor.isServer) {
            console.log('Refreshing');

            ParsedData.update({category: 'manga'}, {$set: {parsed: 0, isParsing: true}});

            const mangas = Manga.find().fetch().map(manga => manga.parse());

            Promise.all(mangas).then(() => {
                ParsedData.update({category: 'manga'}, {$set: {isParsing: false}});
            }, reason => {
                ParsedData.update({category: 'manga'}, {$set: {isParsing: false}});
                console.log(reason);
            })
        }
    }
});

export const mark_seen = new ValidatedMethod({
    name: "Manga.mark_seen",
    validate: null,

    run({id}) {
        Manga.update({_id: id}, {$set: {seen: true}})
    }
});

export const remove = new ValidatedMethod({
    name: "Manga.remove",
    validate: null,

    run({id}) {
        Manga.remove({_id: id});
    }
});

const job = new CronJob({
    cronTime: "0 */3 * * *",
    onTick: Meteor.bindEnvironment(function() {
        console.log('Start cron job')
        refresh_all.call();
    })
});

if (Meteor.isServer) {
    Meteor.startup(function () {
        job.start()
    })
}