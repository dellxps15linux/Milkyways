import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface CrewDetailsState {
    isLoading: boolean;
    startDateIndex?: number;
    crewlists: CrewDetails[];
}

export interface CrewDetails {
    StaffNumber: string;
    StaffName: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestCrewDetailsAction {
    type: 'REQUEST_CREW_DETAILS';
    startDateIndex: number;
}

interface ReceiveCrewDetailsAction {
    type: 'RECEIVE_CREW_DETAILS';
    startDateIndex: number;
    crewlists: CrewDetails[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestCrewDetailsAction | ReceiveCrewDetailsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestCrewDetails: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.CrewDetails && startDateIndex !== appState.CrewDetails.startDateIndex) {
            fetch(`crew`)
                .then(response => response.json() as Promise<CrewDetails[]>)
                .then(data => {
                    console.log(data);
                    dispatch({ type: 'RECEIVE_CREW_DETAILS', startDateIndex: startDateIndex, crewlists: data });
                });

            dispatch({ type: 'REQUEST_CREW_DETAILS', startDateIndex: startDateIndex });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: CrewDetailsState = { crewlists: [], isLoading: false };

export const reducer: Reducer<CrewDetailsState> = (state: CrewDetailsState | undefined, incomingAction: Action): CrewDetailsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_CREW_DETAILS':
            return {
                startDateIndex: action.startDateIndex,
                crewlists: state.crewlists,
                isLoading: true
            };
        case 'RECEIVE_CREW_DETAILS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.startDateIndex === state.startDateIndex) {
                return {
                    startDateIndex: action.startDateIndex,
                    crewlists: action.crewlists,
                    isLoading: false
                };
            }
            break;
    }

    return state;
};
