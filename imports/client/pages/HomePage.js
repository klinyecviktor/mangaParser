import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import MangaForm from "../components/MangaForm"
import {add_manga, refresh_all} from "/imports/api/manga/methods"

const size = 180;

const style = {
    marginTop: `calc(50vh - 64px - ${size / 2}px)`
};

export default class HomePage extends Component {
    constructor() {
        super();

        this.state = {
            open: false
        };

        this.modalHandle = this.modalHandle.bind(this);
    }

    modalHandle(open) {
        this.setState({open})
    }

    refresh() {
        refresh_all.call();
    }

    render() {
        const {ready, manga} = this.props;

        console.log(manga);
        const rows = manga.map((doc, index) => (
            <TableRow key={index}>
                <TableRowColumn>{index + 1}</TableRowColumn>
                <TableRowColumn><a className="name-url" href={doc.url} target="_blank">{doc.name}</a></TableRowColumn>
                <TableRowColumn>
                    {doc.seen ? <FontIcon className="material-icons">done</FontIcon>
                        : <FontIcon className="material-icons material-icons-clear">clear</FontIcon>}
                </TableRowColumn>
            </TableRow>
        ));

        return (
            <div className="home-container">
                {!ready ? (<CircularProgress size={size} thickness={5} style={style}/>) : (
                    <div>
                        <RaisedButton label="Add manga" primary={true} onClick={() => this.modalHandle(true)}/>
                        <RaisedButton label="Refresh" primary={true} onClick={this.refresh}/>

                        <MangaForm open={this.state.open} modalHandle={this.modalHandle}/>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>№</TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                    <TableHeaderColumn>Seen</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        );
    }
}

HomePage.propTypes = {};