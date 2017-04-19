import React from "react";
import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {mount} from "react-mounter";
import MainLayout from "/imports/ui/layouts/MainLayout"
import HomePage from "/imports/ui/pages/HomePage"

// Set up all routes in the app
FlowRouter.route('/', {
    name: 'Home',
    action() {
        mount(MainLayout, {
            content: (props) => <HomePage {...props} />
        });
    },
});

FlowRouter.notFound = {
    action() {
    },
};
