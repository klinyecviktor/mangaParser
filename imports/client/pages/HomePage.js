import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';
import MangaForm from "../components/MangaForm"
import {refresh_all, mark_seen, remove} from "/imports/api/manga/methods"

const size = 180;

const style = {
    marginTop: `calc(50vh - 64px - ${size / 2}px)`
};

const isMobileDevice = () => (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);

export default class HomePage extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            snackbarOpen: false
        };

        this.modalHandle = this.modalHandle.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {parsed} = nextProps;

        if (parsed && parsed.parsed === parsed.count && this.state.snackbarOpen)
            setTimeout(() => this.setState({snackbarOpen: false}), 1500);
    }

    modalHandle(open) {
        this.setState({open})
    }

    refresh() {
        this.setState({snackbarOpen: true});

        refresh_all.call();
    }

    render() {
        const {ready, manga, parsed} = this.props;

        console.log('manga', manga);
        console.log('parsed', parsed);

        const rows = manga.map((doc, index) => (
            <TableRow key={index}>
                <TableRowColumn className="first-column"><a className="name-url" href={doc.url}
                                                            target="_blank">{doc.name}</a></TableRowColumn>
                <TableRowColumn
                    className="second-column">{moment(doc.lastUpdate).format("D MMMM YYYY")}</TableRowColumn>
                <TableRowColumn className="third-column">
                    {doc.seen ? <FontIcon className="material-icons">done</FontIcon>
                        : <FontIcon className="material-icons material-icons-clear"
                                    onClick={() => mark_seen.call({id: doc._id})}>clear</FontIcon>}
                </TableRowColumn>
                {!isMobileDevice() && <TableRowColumn className="fourth-column">
                    <FontIcon
                        className="material-icons material-icons-clear"
                        onClick={() => remove.call({id: doc._id})}>delete</FontIcon>
                </TableRowColumn>}
            </TableRow>
        ));

        return (
            <div className="home-container">
                {!ready ? (<CircularProgress size={size} thickness={5} style={style}/>) : (
                    <div>
                        <RaisedButton className="btn" label="Add manga" primary={true}
                                      onClick={() => this.modalHandle(true)}/>
                        <RaisedButton className="btn" label="Refresh" primary={true} onClick={this.refresh}/>

                        {this.state.open && <MangaForm modalHandle={this.modalHandle}/>}

                        <div
                            className={`snackbar ${!this.state.snackbarOpen && 'hide'}`}
                        >
                            {`Manga Parsed: ${parsed.parsed} / ${parsed.count}`}
                        </div>

                        <Table selectable={false}>
                            <TableHeader displaySelectAll={false}
                                         adjustForCheckbox={false}>
                                <TableRow>
                                    <TableHeaderColumn className="first-column">Name</TableHeaderColumn>
                                    <TableHeaderColumn className="second-column">Date</TableHeaderColumn>
                                    <TableHeaderColumn className="third-column">Seen</TableHeaderColumn>
                                    {!isMobileDevice() && <TableHeaderColumn className="fourth-column">Remove</TableHeaderColumn>}
                                </TableRow>
                            </TableHeader>
                            <TableBody stripedRows={true}
                                displayRowCheckbox={false}>
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