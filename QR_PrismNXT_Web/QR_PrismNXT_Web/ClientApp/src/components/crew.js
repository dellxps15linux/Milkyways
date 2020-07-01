"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var CrewDetailsStore = require("../store/crewStore");
var FetchData = /** @class */ (function (_super) {
    __extends(FetchData, _super);
    function FetchData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // This method is called when the component is first added to the document
    FetchData.prototype.componentDidMount = function () {
        this.ensureDataFetched();
    };
    // This method is called when the route parameters change
    FetchData.prototype.componentDidUpdate = function () {
        this.ensureDataFetched();
    };
    FetchData.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("h1", { id: "tabelLabel" }, "Crew Details"),
            React.createElement("p", null, "This component demonstrates fetching data from the server and working with URL parameters."),
            this.renderCrewDetailTable(),
            this.renderPagination()));
    };
    FetchData.prototype.ensureDataFetched = function () {
        var startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
        this.props.requestCrewDetails(startDateIndex);
    };
    FetchData.prototype.renderCrewDetailTable = function () {
        return (React.createElement("div", null,
            React.createElement("table", { className: 'table table-striped' },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Staff Numbers"),
                        React.createElement("th", null, "Staff Names"))),
                React.createElement("tbody", null, this.props.crewlists.map(function (cl) {
                    return React.createElement("tr", { key: cl.staffNumber },
                        React.createElement("td", null, cl.staffNumber),
                        React.createElement("td", null, cl.staffName));
                })))));
    };
    FetchData.prototype.renderPagination = function () {
        var prevStartDateIndex = (this.props.startDateIndex || 0) - 5;
        var nextStartDateIndex = (this.props.startDateIndex || 0) + 5;
        return (React.createElement("div", { className: "d-flex justify-content-between" },
            React.createElement(react_router_dom_1.Link, { className: 'btn btn-outline-secondary btn-sm', to: "/crew-data/" + prevStartDateIndex }, "Previous"),
            this.props.isLoading && React.createElement("span", null, "Loading..."),
            React.createElement(react_router_dom_1.Link, { className: 'btn btn-outline-secondary btn-sm', to: "/crew-data/" + nextStartDateIndex }, "Next")));
    };
    return FetchData;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.CrewDetails; }, // Selects which state properties are merged into the component's props
CrewDetailsStore.actionCreators // Selects which action creators are merged into the component's props
)(FetchData);
//# sourceMappingURL=crew.js.map