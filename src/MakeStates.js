import React, { useEffect, useState } from "react";
import { Card, ListGroup, Button, Modal, Dropdown } from "react-bootstrap";
import { getStatePop, pop, sortConf, sortDead } from "./services";

export default function MakeStates({ states, us }) {
	const [states2, setStates2] = useState(states);

	const setActive = (e) => {
		e.preventDefault();
		let select = e.target.text;
		if (select === "Alphabetically") {
			console.log("Alphabetically");
			// 	setStates2(states);
			// 	console.log(states2);
			// } else if (select === "Total Confirmed") {
			// 	console.log("Total Confirmed");
			// 	setStates2(sortConf(states));
			// 	console.log(states2);
			// } else if (select === "Total Dead") {
			// 	console.log("Total Dead");
			// 	setStates2(sortDead(states));
			// 	console.log(states2);
		}
	};

	if (states2[0] !== undefined) {
		return (
			<div>
				<Dropdown>
					<Dropdown.Toggle variant="success" id="dropdown-basic">
						Sort by
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item
							id="bkGrnd"
							key="alphabetically"
							onClick={(e) => {
								setActive(e);
							}}
						>
							Alphabetically
						</Dropdown.Item>
						<Dropdown.Item
							id="bkGrnd"
							key="totalConfirmed"
							onClick={(e) => {
								setActive(e);
							}}
						>
							Total Confirmed
						</Dropdown.Item>
						<Dropdown.Item
							id="bkGrnd"
							key="totalDead"
							onClick={(e) => {
								setActive(e);
							}}
						>
							Total Dead
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<div id="statesList">
					{states2.map((state) => {
						let statePop = getStatePop(state.state);
						return (
							<div key={state.state} id="state">
								<Card style={{ width: "20rem", backgroundColor: "#505357" }}>
									<Card.Header id="topStat">{state.state}</Card.Header>
									<ListGroup variant="flush">
										<ListGroup.Item id="bkGrnd">
											{state.state} Total Confirmed: {state.positive}
										</ListGroup.Item>{" "}
										<ListGroup.Item id="bkGrnd">
											{state.state} % Total Confirmed of State Population:
											{((state.positive / statePop) * 100).toFixed(2)}%
										</ListGroup.Item>
										<ListGroup.Item id="bkGrnd">
											{state.state} % Total Confirmed of US Cases:
											{((state.positive / us) * 100).toFixed(2)}%
										</ListGroup.Item>
										<ListGroup.Item id="bkGrnd">
											{state.state} Total Deaths: {state.death}
										</ListGroup.Item>
										<ListGroup.Item id="bkGrnd">
											{state.state} Total Recovered: {state.recovered}
										</ListGroup.Item>
										<ListGroup.Item id="bkGrnd">
											{state.state} Death per Confirmed:
											{((state.death / state.positive) * 100).toFixed(2)}%
										</ListGroup.Item>
										<ListGroup.Item id="bkGrnd">
											{state.state} Recovered per Confirmed:
											{((state.recovered / state.positive) * 100).toFixed(2)}%
										</ListGroup.Item>
									</ListGroup>
								</Card>
							</div>
						);
					})}
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<h1>Please Refresh</h1>
			</div>
		);
	}
}
