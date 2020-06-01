import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import MakeStates from "./MakeStates";
import "./App.css";
import USAMap from "react-usa-map";
import Global from "./Global";
import US from "./US";
import Graphs from "./Graphs";
import { Card, ListGroup, Button, Nav, Navbar } from "react-bootstrap";
import { getStateInfo, getStatePop } from "./services";
import IndvState from "./IndvState";

function App() {
	const [global, setGlobal] = useState({});
	const [us, setUs] = useState({});
	const [states, setStates] = useState({});
	const [days, setDays] = useState({});
	const [show, setShow] = useState(false);

	const handleClick = async (e) => {
		e.preventDefault();
		await axios.get("https://api.covid19api.com/summary").then((response) => {
			console.log(response.Global);
			if (response.Global !== undefined) {
				alert("Too Many Requests, Please Try Again");
			} else {
				setGlobal(response.data.Global);
				setUs(response.data.Countries[177]);
				axios.post("/api/global", response.data.Global).then((response) => {
					console.log(response.data);
				});
				axios.post("/api/us", response.data.Countries[177]).then((response) => {
					console.log(response.data);
				});
			}
		});
		await axios.get("https://covidtracking.com/api/states").then((response) => {
			setStates(response.data);
		});
		await axios
			.get("https://covidtracking.com/api/states/daily")
			.then((response) => {
				console.log(response);
				setDays(response.data);
			});
	};

	const mapHandler = (e) => {
		if (states[0] !== undefined) {
			let state = getStateInfo(e.target.dataset.name, states);
			let statePop = getStatePop(state.state);
			alert(`${state.state}
			Total Confirmed: ${state.positive}
			Total Confirmed of State Population:	${(
				(state.positive / statePop) *
				100
			).toFixed(2)}%
			Total Deaths: ${state.death}
			Total Recovered: ${state.recovered}
			Death per Confirmed: ${((state.death / state.positive) * 100).toFixed(2)}%
			Recovered per Confirmed: ${((state.recovered / state.positive) * 100).toFixed(
				2
			)}%
		`);
		} else {
			alert(e.target.dataset.name);
		}
	};

	return (
		<div>
			<Router>
				<div>
					<nav>
						<div id="navbar">
							<span id="pageLabel">Ryan's Covid Tracker</span>
							<Link to="/">Home</Link>
							<Link to="/list">States</Link>
							<Link to="/state">Individual State</Link>
							<Link to="/graphs">Graphs</Link>
							<Button variant="primary" onClick={handleClick}>
								Refresh
							</Button>
						</div>
					</nav>
					<Switch>
						<Route path="/list">
							<MakeStates states={states} us={us.TotalConfirmed} />
						</Route>
						<Route path="/state">
							<IndvState states={states} us={us.TotalConfirmed} />
						</Route>
						<Route path="/graphs">
							<Graphs
								states={states}
								us={us.TotalConfirmed}
								global={global.TotalConfirmed}
							/>
						</Route>
						<Route path="/">
							<div id="main">
								<Global global={global} />
								<US us={us} global={global.TotalConfirmed} />
								<USAMap onClick={mapHandler} />
							</div>
						</Route>
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
