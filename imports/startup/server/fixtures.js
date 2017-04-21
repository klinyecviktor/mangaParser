// Fill the DB with example data on startup
import {Meteor} from 'meteor/meteor';
import {ParsedData} from "/imports/api/parsedData/parsedData_collection"

Meteor.startup(() => {
    if (Meteor.isServer && !ParsedData.findOne()) {
        ParsedData.insert({category: 'manga'})
    }
})