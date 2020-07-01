"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
exports.actionCreators = {
    requestCrewDetails: function (startDateIndex) { return function (dispatch, getState) {
        // Only load data if it's something we don't already have (and are not already loading)
        var appState = getState();
        if (appState && appState.CrewDetails && startDateIndex !== appState.CrewDetails.startDateIndex) {
            fetch("crew")
                .then(function (response) { return response.json(); })
                .then(function (data) {
                console.log(data);
                dispatch({ type: 'RECEIVE_CREW_DETAILS', startDateIndex: startDateIndex, crewlists: data });
            });
            dispatch({ type: 'REQUEST_CREW_DETAILS', startDateIndex: startDateIndex });
        }
    }; }
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var unloadedState = { crewlists: [], isLoading: false };
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
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
//# sourceMappingURL=crewStore.js.map