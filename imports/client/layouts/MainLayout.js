import React, {Component} from "react";
import {Helmet} from "react-helmet";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

export default class MainLayout extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Helmet>
                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet"/>
                        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                        <link rel="icon" type="image/x-icon" href="/img/favicon.ico"/>
                    </Helmet>
                    <AppBar
                        title="Manga Parser"
                    />
                    <main>
                        { this.props.content({...this.props}) }
                    </main>
                </div>

            </MuiThemeProvider>
        );
    }
}

MainLayout.propTypes = {};