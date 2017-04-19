import React, {Component} from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

export default class MainLayout extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
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