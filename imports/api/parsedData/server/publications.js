import {ParsedData} from "../parsedData_collection"

if (Meteor.isServer) {
    Meteor.publish('parsed', function (category) {
        return ParsedData.find({category});
    })
}