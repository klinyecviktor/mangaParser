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