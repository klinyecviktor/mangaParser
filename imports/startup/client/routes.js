import React from "react";
import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {mount} from "react-mounter";
import MainLayout from "/imports/client/layouts/MainLayout"
import HomeCont from "/imports/client/containers/HomeCont"

// Set up all routes in the app
FlowRouter.route('/', {
    name: 'Home',
    action() {
        mount(MainLayout, {
            content: (props) => <HomeCont {...props} />
        });
    },
});

FlowRouter.notFound = {
    action() {
    },
};
