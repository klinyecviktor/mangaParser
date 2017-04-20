import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Manga} from "./manga_collection";

export const add_manga = new ValidatedMethod({
    name: "Manga.add_manga",
    validate: null,
    run({name, url}) {
        const id = Manga.insert({name, url});

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

            const mangas = Manga.find().fetch().map(manga => manga.parse());

            Promise.all(mangas).then(null, reason => {
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

})