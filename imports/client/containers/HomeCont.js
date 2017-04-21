import {createContainer} from 'meteor/react-meteor-data';
import {Manga} from "/imports/api/manga/manga_collection"
import {ParsedData} from "/imports/api/parsedData/parsedData_collection"
import HomePage from "../pages/HomePage"

export default createContainer(() => {
    const subReady = Meteor.subscribe('manga').ready() && Meteor.subscribe('parsed', 'manga').ready();
    const manga = Manga.find().fetch();
    const parsed = ParsedData.findOne();

    return {
        ready: subReady,
        manga,
        parsed
    }
}, HomePage)