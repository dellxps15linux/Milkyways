﻿import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as CrewDetailsStore from '../store/crewStore';

// At runtime, Redux will merge together...
type CrewDetailsProps =
    CrewDetailsStore.CrewDetailsState // ... state we've requested from the Redux store
    & typeof CrewDetailsStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters


class FetchData extends React.PureComponent<CrewDetailsProps> {
    // This method is called when the component is first added to the document
    public componentDidMount() {
        this.ensureDataFetched();
    }

    // This method is called when the route parameters change
    public componentDidUpdate() {
        this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                <h1 id="tabelLabel">Crew Details</h1>
                <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
                {this.renderCrewDetailTable()}
                {this.renderPagination()}
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
        this.props.requestCrewDetails(startDateIndex);
    }

    private renderCrewDetailTable() {
        return (
            <div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Staff Numbers</th>
                            <th>Staff Names</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.crewlists.map(cl =>
                            <tr key={cl.StaffNumber}>
                                <td>{cl.StaffNumber}</td>
                                <td>{cl.StaffName}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    private renderPagination() {
        const prevStartDateIndex = (this.props.startDateIndex || 0) - 5;
        const nextStartDateIndex = (this.props.startDateIndex || 0) + 5;

        return (
            <div className="d-flex justify-content-between">
                <Link className='btn btn-outline-secondary btn-sm' to={`/crew-data/${prevStartDateIndex}`}>Previous</Link>
                {this.props.isLoading && <span>Loading...</span>}
                <Link className='btn btn-outline-secondary btn-sm' to={`/crew-data/${nextStartDateIndex}`}>Next</Link>
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.CrewDetails, // Selects which state properties are merged into the component's props
    CrewDetailsStore.actionCreators // Selects which action creators are merged into the component's props
)(FetchData as any);
