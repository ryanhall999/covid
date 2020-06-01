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

function App() {
	const [global, setGlobal] = useState({});
	const [us, setUs] = useState({});
	const [states, setStates] = useState({});
	const [days, setDays] = useState({});
	const [show, setShow] = useState(false);

	const handleClick = async (e) => {
		e.preventDefault();
		await axios.get("https://api.covid19api.com/summary").then((response) => {
			setGlobal(response.data.Global);
			setUs(response.data.Countries[177]);
		});
		// await axios
		// 	.get("https://covidtracking.com/api/states/daily")
		// 	.then((response) => {
		// 		console.log(response);
		// 		setDays(response.data);
		// 	});
		//
		await axios.get("https://covidtracking.com/api/states").then((response) => {
			setStates(response.data);
		});
		await axios.post("/api/global", global).then((response) => {
			console.log(response);
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

	console.log(states);

	return (
		<div>
			<div>
				<Router>
					<Navbar bg="dark" variant="dark">
						<Navbar.Brand href="#home">Ryan's Covid Tracker</Navbar.Brand>
						<Nav className="mr-auto">
							<Nav.Link href="#home">Home</Nav.Link>
							<Nav.Link href="#lists">Lists</Nav.Link>
							<Nav.Link href="#graphs">Graphs</Nav.Link>
						</Nav>
						<Route path="#lists" component={MakeStates} exact />
						<Button variant="primary" onClick={handleClick}>
							Refresh
						</Button>
					</Navbar>
					<Switch>
						<Route path="#home">
							<div id="main">
								<Global global={global} />
								<US us={us} />
								<USAMap onClick={mapHandler} />
							</div>
						</Route>
						<Route path="#lists">
							<MakeStates states={states} />
						</Route>
						<Route path="#graphs"></Route>
					</Switch>
				</Router>
			</div>
			<div>
				<div id="main">
					<Global global={global} />
					<US us={us} />
					<USAMap onClick={mapHandler} />
					<Graphs states={states} />
					<MakeStates states={states} />
				</div>
			</div>
		</div>
	);
}

export default App;
//
