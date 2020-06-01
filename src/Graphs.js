import React, { useEffect, useState } from "react";
import { createStateLabels, createStateCases } from "./services";
import { Bar, Pie, Doughnut } from "react-chartjs-2";

export default function Graphs({ states, us, global }) {
	if (states[0] !== undefined) {
		let stateList = createStateLabels(states);
		let data = createStateCases(states);
		const stateFormatted = {
			labels: stateList,
			datasets: [
				{
					label: "Covid19 Cases",
					backgroundColor: "rgba(75,192,192,1)",
					borderColor: "rgba(0,0,0,1)",
					borderWidth: 1,
					data: data,
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
				<div>
					<Bar
						id="graph"
						data={stateFormatted}
						options={{
							title: {
								display: true,
								text: "Cases per State",
								fontSize: 20,
								fontColor: "whitesmoke",
							},
							legend: {
								display: false,
								position: "right",
							},
							responsive: true,
							maintainAspectRatio: false,
							scales: {
								yAxes: [
									{
										ticks: {
											beginAtZero: true,
										},
									},
								],
							},
						}}
					/>
				</div>
				<div>
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
							maintainAspectRatio: false,
						}}
					/>
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
