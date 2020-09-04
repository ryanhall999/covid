import React, { useEffect, useState } from "react";
import {
	createStateLabels,
	createStateCases,
	greaterThan50,
	lessThan50,
} from "./services";
import { Bar, Pie, Doughnut } from "react-chartjs-2";

export default function Graphs({ states, us, global }) {
	if (states[0] !== undefined) {
		let stateList = createStateLabels(states);
		let highList = greaterThan50(states);
		let lowList = lessThan50(states);
		let highStateList = createStateLabels(highList);
		let highData = createStateCases(highList);
		let lowStateList = createStateLabels(lowList);
		let lowData = createStateCases(lowList);

		const highStateFormatted = {
			labels: highStateList,
			datasets: [
				{
					label: "Covid19 Cases",
					backgroundColor: "rgba(75,192,192,1)",
					borderColor: "rgba(0,0,0,1)",
					borderWidth: 1,
					data: highData,
				},
			],
		};

		const lowStateFormatted = {
			labels: lowStateList,
			datasets: [
				{
					label: "Covid19 Cases",
					backgroundColor: "rgba(75,192,192,1)",
					borderColor: "rgba(0,0,0,1)",
					borderWidth: 1,
					data: lowData,
				},
			],
		};

		const usPerWorld = {
			labels: ["World", "US"],
			datasets: [
				{
					label: "Cases",
					backgroundColor: ["#2FDE00", "#00A6B4", "#6800B4"],
					hoverBackgroundColor: ["#175000", "#003350", "#35014F"],
					data: [global - us, us],
				},
			],
		};

		return (
			<div>
				<div id="barGraphs">
					<Bar
						id="graphSide"
						data={highStateFormatted}
						options={{
							title: {
								display: true,
								text: "Cases per State > 100k",
								fontSize: 20,
								fontColor: "whitesmoke",
							},
							legend: {
								display: false,
								position: "right",
								fontColor: "whitesmoke",
							},
							responsive: true,
							maintainAspectRatio: true,
							scales: {
								yAxes: [
									{
										ticks: {
											beginAtZero: true,
											fontColor: "whitesmoke",
										},
									},
								],
								xAxes: [
									{
										ticks: {
											fontColor: "whitesmoke",
										},
									},
								],
							},
						}}
					/>
					<Bar
						id="graphSide"
						data={lowStateFormatted}
						options={{
							title: {
								display: true,
								text: "Cases per State < 100k",
								fontSize: 20,
								fontColor: "whitesmoke",
							},
							legend: {
								display: false,
								position: "right",
							},
							responsive: true,
							maintainAspectRatio: true,
							scales: {
								yAxes: [
									{
										ticks: {
											beginAtZero: true,
											fontColor: "whitesmoke",
										},
									},
								],
								xAxes: [
									{
										ticks: {
											fontColor: "whitesmoke",
										},
									},
								],
							},
						}}
					/>
				</div>
				<Pie
					data={usPerWorld}
					options={{
						title: {
							display: true,
							text: "US Cases of Worldwide Total:",
							fontSize: 20,
							fontColor: "whitesmoke",
						},
						legend: {
							display: false,
							position: "right",
						},
						responsive: true,
						maintainAspectRatio: true,
					}}
				/>
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
