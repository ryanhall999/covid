import React, { useEffect, useState } from "react";
import { ListGroup, Card, Dropdown } from "react-bootstrap";
import {
	createStateLabels,
	sortDays,
	getStateInfo,
	createStateCases,
	createCaseDates,
	createDeathInfo,
	createDeathDirv,
	createCaseDirv,
	getStatePop,
	createNegDirv,
	createStateNegs,
} from "./services";
import { Line } from "react-chartjs-2";

export default function IndvState({ states, us, days }) {
	const [selected, setSelected] = useState("");
	const [stateDays, setStateDays] = useState([]);
	const [statePop, setStatePop] = useState("");
	const [daysData, setDaysData] = useState([]);
	const [caseDates, setCaseDates] = useState([]);
	const [deathDays, setDeathDays] = useState([]);
	const [deathOverTime, setDeathOverTime] = useState([]);
	const [caseOverTime, setCaseOverTime] = useState([]);
	const [negs, setNegs] = useState([]);
	const [negsOT, setNegsOT] = useState([]);

	let list = createStateLabels(states);

	function setActive(e) {
		e.preventDefault();
		let targetState = e.target.textContent;
		setStatePop(getStatePop(targetState));
		setSelected(getStateInfo(targetState, states));
		let sortedDays = sortDays(days, targetState);
		setStateDays(sortedDays);
		setDaysData(createStateCases(sortedDays));
		setCaseDates(createCaseDates(sortedDays));
		setDeathDays(createDeathInfo(sortedDays));
		setDeathOverTime(createDeathDirv(sortedDays));
		setCaseOverTime(createCaseDirv(sortedDays));
		setNegs(createStateNegs(sortedDays));
		setNegsOT(createNegDirv(sortedDays));
	}

	const caseData = {
		labels: caseDates.reverse(),
		datasets: [
			{
				label: "Cases",
				yAxisID: "A",
				data: daysData.reverse(),
				fill: true,
				backgroundColor: "rgba(75,192,192,0.2)",
				borderColor: "rgba(75,192,192,1)",
			},
			{
				label: "Cases per Day",
				yAxisID: "B",
				data: caseOverTime.reverse(),
				fill: false,
				borderColor: "#742774",
			},
		],
	};

	const deathIncData = {
		labels: caseDates.reverse(),
		datasets: [
			{
				label: "Deaths",
				yAxisID: "A",
				data: deathDays.reverse(),
				fill: true,
				borderColor: "#742774",
			},
			{
				label: "Deaths per Day",
				yAxisID: "B",
				data: deathOverTime.reverse(),
				fill: false,
				borderColor: "#742774",
			},
		],
	};

	const negIncData = {
		labels: caseDates.reverse(),
		datasets: [
			{
				label: "Negatives",
				yAxisID: "A",
				data: negs.reverse(),
				fill: true,
				borderColor: "#742774",
			},
			{
				label: "Negatives per Day",
				yAxisID: "B",
				data: negsOT.reverse(),
				fill: false,
				borderColor: "#742774",
			},
		],
	};

	if (selected === "") {
		return (
			<Dropdown>
				<Dropdown.Toggle variant="success" id="dropdown-basic">
					Select A State
				</Dropdown.Toggle>
				<Dropdown.Menu>
					{list.map((state) => {
						return (
							<Dropdown.Item
								key={state}
								onClick={(e) => {
									setActive(e);
								}}
							>
								{state}
							</Dropdown.Item>
						);
					})}
				</Dropdown.Menu>
			</Dropdown>
		);
	} else {
		return (
			<div id="listOuterBox">
				<Dropdown>
					<Dropdown.Toggle variant="success" id="dropdown-basic">
						Select A State
					</Dropdown.Toggle>
					<Dropdown.Menu>
						{list.map((state) => {
							return (
								<Dropdown.Item
									key={state}
									onClick={(e) => {
										setActive(e);
									}}
								>
									{state}
								</Dropdown.Item>
							);
						})}
					</Dropdown.Menu>
				</Dropdown>
				<div id="stateDayPage">
					<Card style={{ backgroundColor: "#505357", width: "100%" }}>
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
							<ListGroup.Item
								style={{
									backgroundColor: "#505357",
								}}
							>
								{selected.state} % Total Confirmed of State Population:
								{((selected.positive / statePop) * 100).toFixed(2)}%
							</ListGroup.Item>
							<ListGroup.Item
								style={{
									backgroundColor: "#505357",
								}}
							>
								{selected.state} % Total Confirmed of US Cases:
								{((selected.positive / us) * 100).toFixed(2)}%
							</ListGroup.Item>
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
						data={caseData}
						options={{
							title: {
								display: true,
								text: `${selected.state} Cases over Time`,
								fontSize: 20,
								fontColor: "whitesmoke",
							},
							legend: {
								labels: {
									fontColor: "whitesmoke",
								},
							},
							responsive: true,
							maintainAspectRatio: true,
							scales: {
								xAxes: [
									{
										gridLines: {
											display: false,
										},
										ticks: {
											fontColor: "whitesmoke",
										},
									},
								],
								yAxes: [
									{
										id: "A",
										type: "linear",
										position: "left",
										ticks: {
											fontColor: "whitesmoke",
										},
									},
									{
										id: "B",
										type: "linear",
										position: "right",
										ticks: {
											fontColor: "whitesmoke",
										},
									},
								],
							},
						}}
					/>
					<Line
						data={deathIncData}
						options={{
							title: {
								display: true,
								text: `${selected.state} Deaths over Time`,
								fontSize: 20,
								fontColor: "whitesmoke",
							},
							responsive: true,
							maintainAspectRatio: true,
							legend: {
								labels: {
									fontColor: "whitesmoke",
								},
							},
							scales: {
								xAxes: [
									{
										gridLines: {
											display: false,
										},
										ticks: {
											fontColor: "whitesmoke",
										},
									},
								],
								yAxes: [
									{
										id: "A",
										type: "linear",
										position: "left",
										ticks: {
											fontColor: "whitesmoke",
										},
									},
									{
										id: "B",
										type: "linear",
										position: "right",
										ticks: {
											fontColor: "whitesmoke",
										},
									},
								],
							},
						}}
					/>
					<Line
						data={negIncData}
						options={{
							title: {
								display: true,
								text: `${selected.state} Negatives over Time`,
								fontSize: 20,
								fontColor: "whitesmoke",
							},
							responsive: true,
							maintainAspectRatio: true,
							legend: {
								labels: {
									fontColor: "whitesmoke",
								},
							},
							scales: {
								xAxes: [
									{
										gridLines: {
											display: false,
										},
										ticks: {
											fontColor: "whitesmoke",
										},
									},
								],
								yAxes: [
									{
										id: "A",
										type: "linear",
										position: "left",
										ticks: {
											fontColor: "whitesmoke",
										},
									},
									{
										id: "B",
										type: "linear",
										position: "right",
										ticks: {
											fontColor: "whitesmoke",
										},
									},
								],
							},
						}}
					/>
				</div>
			</div>
		);
	}
}
