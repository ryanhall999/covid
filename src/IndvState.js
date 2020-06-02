import React, { useEffect, useState } from "react";
import { ListGroup, Card } from "react-bootstrap";
import {
	createStateLabels,
	sortDays,
	getStateInfo,
	createStateCases,
	createCaseDates,
	createDeathInfo,
} from "./services";
import { Line } from "react-chartjs-2";

export default function IndvState({ states, us, days }) {
	const [selected, setSelected] = useState("");
	const [stateDays, setStateDays] = useState([]);
	const [daysData, setDaysData] = useState([]);
	const [caseDates, setCaseDates] = useState([]);
	const [deathDays, setDeathDays] = useState([]);

	let list = createStateLabels(states);

	function setActive(e) {
		e.preventDefault();
		console.log(e.target.textContent);
		setSelected(getStateInfo(e.target.textContent, states));
		let sortedDays = sortDays(days, e.target.textContent);
		setStateDays(sortedDays);
		setDaysData(createStateCases(sortedDays));
		setCaseDates(createCaseDates(sortedDays));
		setDeathDays(createDeathInfo(sortedDays));
	}

	const data = {
		labels: caseDates.reverse(),
		datasets: [
			{
				label: "First dataset",
				data: daysData.reverse(),
				fill: true,
				backgroundColor: "rgba(75,192,192,0.2)",
				borderColor: "rgba(75,192,192,1)",
			},
			{
				label: "Second dataset",
				data: deathDays.reverse(),
				fill: false,
				borderColor: "#742774",
			},
		],
	};

	console.log(deathDays);

	if (selected === "") {
		return (
			<div>
				<ListGroup
					as="ul"
					style={{
						backgroundColor: "#505357",
					}}
				>
					{list.map((state) => {
						return (
							<ListGroup.Item
								as="li"
								style={{
									backgroundColor: "#505357",
								}}
								onClick={(e) => {
									setActive(e);
								}}
							>
								{state}
							</ListGroup.Item>
						);
					})}
				</ListGroup>
			</div>
		);
	} else {
		return (
			<div id="listOuterBox">
				<ListGroup
					as="ul"
					style={{
						backgroundColor: "#505357",
					}}
				>
					{list.map((state) => {
						return (
							<ListGroup.Item
								key={state}
								as="li"
								style={{
									backgroundColor: "#505357",
								}}
								onClick={(e) => {
									setActive(e);
								}}
							>
								{state}
							</ListGroup.Item>
						);
					})}
				</ListGroup>
				<div id="stateDayPage">
					<Card style={{ backgroundColor: "#505357" }}>
						<Card.Header
							style={{
								fontWeight: "bold",
								fontSize: "2rem",
								alignSelf: "center",
								backgroundColor: "#505357",
							}}
						>
							{selected.state}
						</Card.Header>
						<ListGroup variant="flush">
							<ListGroup.Item
								style={{
									backgroundColor: "#505357",
								}}
							>
								{selected.state} Total Confirmed: {selected.positive}
							</ListGroup.Item>{" "}
							{/* <ListGroup.Item
								style={{
									backgroundColor: "#505357",
								}}
							>
								{selected.state} % Total Confirmed of State Population:
								{((selected.positive / statePop) * 100).toFixed(2)}%
							</ListGroup.Item> */}
							{/* <ListGroup.Item
								style={{
									backgroundColor: "#505357",
								}}
							>
								{selected.state} % Total Confirmed of US Cases:
								{((selected.positive / us) * 100).toFixed(2)}%
							</ListGroup.Item> */}
							<ListGroup.Item
								style={{
									backgroundColor: "#505357",
								}}
							>
								{selected.state} Total Deaths: {selected.death}
							</ListGroup.Item>
							<ListGroup.Item
								style={{
									backgroundColor: "#505357",
								}}
							>
								{selected.state} Total Recovered: {selected.recovered}
							</ListGroup.Item>
							<ListGroup.Item
								style={{
									backgroundColor: "#505357",
								}}
							>
								{selected.state} Death per Confirmed:
								{((selected.death / selected.positive) * 100).toFixed(2)}%
							</ListGroup.Item>
							<ListGroup.Item
								style={{
									backgroundColor: "#505357",
								}}
							>
								{selected.state} Recovered per Confirmed:
								{((selected.recovered / selected.positive) * 100).toFixed(2)}%
							</ListGroup.Item>
						</ListGroup>
					</Card>
					<Line
						data={data}
						options={{
							title: {
								display: true,
								text: `${selected.state} Cases over Time`,
								fontSize: 20,
								fontColor: "whitesmoke",
							},
							responsive: true,
							maintainAspectRatio: false,
						}}
					/>
				</div>
			</div>
		);
	}
}
