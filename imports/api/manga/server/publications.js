import {Manga} from "../manga_collection"

if (Meteor.isServer) {
    Meteor.publish('manga', function () {
        return Manga.find();
    })
}