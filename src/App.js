import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import MakeStates from "./MakeStates";
import "./App.css";
import USAMap from "react-usa-map";
import Global from "./Global";
import US from "./US";
import Graphs from "./Graphs";
import { Button } from "react-bootstrap";
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
		await axios
			.get("https://api.covid19api.com/summary")
			.then((response) => {
				setGlobal(response.data.Global);
				setUs(response.data.Countries[180]);
				axios.post("/api/global", response.data.Global).then((response) => {
					console.log(response.data);
				});
				axios.post("/api/us", response.data.Countries[180]).then((response) => {
					console.log(response.data);
				});
			})
			.catch((error) => {
				console.log(error);
			});
		await axios
			.get("https://api.covidtracking.com/v1/states/current.json")
			.then((response) => {
				setStates(response.data);
			});
		await axios
			.get("https://api.covidtracking.com/v1/states/daily.json")
			.then((response) => {
				setDays(response.data);
			});
	};

	const liveRefresh = async () => {
		await axios
			.get("https://api.covid19api.com/summary")
			.then((response) => {
				setGlobal(response.data.Global);
				setUs(response.data.Countries[177]);
				axios.post("/api/global", response.data.Global).then((response) => {
					console.log(response.data);
				});
				axios.post("/api/us", response.data.Countries[177]).then((response) => {
					console.log(response.data);
				});
			})
			.catch((error) => {
				console.log(error);
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

	console.log(states, days);

	// setInterval(liveRefresh, 21600000);

	return (
		<div>
			<Router>
				<div>
					<nav>
						<div id="navbar">
							<span id="pageLabel">Ryan's Covid Tracker</span>
							<Link to="/">Home</Link>
							<Link to="/list">All States</Link>
							<Link to="/state">Individual State</Link>
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
							<IndvState states={states} us={us.TotalConfirmed} days={days} />
						</Route>
						<Route path="/">
							<div id="main">
								<Global global={global} />
								<US us={us} global={global.TotalConfirmed} />
								<USAMap onClick={mapHandler} />
								<Graphs
									states={states}
									us={us.TotalConfirmed}
									global={global.TotalConfirmed}
								/>
							</div>
						</Route>
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
