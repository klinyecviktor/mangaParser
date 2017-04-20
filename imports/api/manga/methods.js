import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Manga} from "./manga_collection";

export const add_manga = new ValidatedMethod({
    name: "Manga.add_manga",
    validate: null,
    run({name, url}) {
        Manga.insert({name, url});
    }
});

export const refresh_all = new ValidatedMethod({
    name: "Manga.refresh_all",
    validate: null,

    run() {
        if (Meteor.isServer) {
            console.log('Refreshing');

            const mangas = Manga.find().fetch().map(manga => manga.parse());

            Promise.all(mangas).then(null, reason => {
                console.log(reason);
            })
        }
    }
})