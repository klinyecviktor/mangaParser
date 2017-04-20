import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {add_manga} from "/imports/api/manga/methods"

const customContentStyle = {
    width: '20%',
};

export default class MangaForm extends Component {
    constructor() {
        super();

        this.state = {
            nameValue: '',
            urlValue: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    check() {
        const {nameValue, urlValue} = this.state;
        const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        const regex = new RegExp(expression);
        let error = false;

        if (nameValue === '') {
            this.setState({nameError: true});
            error = true;
        }

        if (!urlValue.match(regex)) {
            this.setState({urlError: true});
            error = true;
        }

        return error;
    }

    handleChange(event) {
        const {name, value} = event.target;

        this.setState({
            [`${name}Value`]: value,
            [`${name}Error`]: false,
        });
    };

    handleSubmit() {
        const {nameValue, urlValue} = this.state;

        if (!this.check()) {
            this.props.modalHandle(false);

            add_manga.call({name: nameValue, url: urlValue});
        }
    }

    render() {
        const {open, modalHandle} = this.props;
        const {nameValue, urlValue, nameError, urlError} = this.state;

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() => modalHandle(false)}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSubmit}
            />,
        ];

        return (
            <Dialog
                title="Add Manga"
                actions={actions}
                open={true}
                onRequestClose={modalHandle}
                autoScrollBodyContent={true}
                contentStyle={customContentStyle}
            >
                <TextField
                    name="name"
                    value={nameValue}
                    onChange={this.handleChange}
                    fullWidth={true}
                    floatingLabelText="Manga Name"
                    errorText={nameError ? "Can't be empty" : ''}
                />
                <br/>
                <TextField
                    name="url"
                    value={urlValue}
                    onChange={this.handleChange}
                    fullWidth={true}
                    floatingLabelText="URL"
                    hintText="http://readmanga.ru/example"
                    errorText={urlError ? "Wrong format" : ''}
                />
            </Dialog>
        );
    }
};