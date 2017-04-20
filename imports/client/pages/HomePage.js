import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import {add_manga, refresh_all} from "/imports/api/manga/methods"

const size = 180;

const style = {
    marginTop: `calc(50vh - 64px - ${size / 2}px)`
};

export default class HomePage extends Component {
    handleClick() {
        add_manga.call({url: 'test'})
    }

    refresh() {
        refresh_all.call();
    }

    render() {
        const {ready, manga} = this.props;

        return (
            <div className="home-container">
                {!ready ? (<CircularProgress size={size} thickness={5} style={style}/>) : (
                    <div>
                        <RaisedButton label="Add manga" primary={true} onClick={this.handleClick}/>
                        <RaisedButton label="Refresh" primary={true} onClick={this.refresh}/>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                    <TableHeaderColumn>Status</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableRowColumn>1</TableRowColumn>
                                    <TableRowColumn>John Smith</TableRowColumn>
                                    <TableRowColumn>Employed</TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        );
    }
}

HomePage.propTypes = {};