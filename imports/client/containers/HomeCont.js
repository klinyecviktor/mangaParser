import {createContainer} from 'meteor/react-meteor-data';
import {Manga} from "/imports/api/manga/manga_collection"
import HomePage from "../pages/HomePage"

export default createContainer(() => {
    const subReady = Meteor.subscribe('manga').ready();
    const manga = Manga.find().fetch();

    return {
        ready: subReady,
        manga
    }
}, HomePage)