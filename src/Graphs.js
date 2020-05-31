import React, { useEffect, useState } from "react";
import { createStateLabels, createStateCases } from "./services";
import { Bar } from "react-chartjs-2";

export default function Graphs({ states }) {
	console.log(states);
	let stateList = createStateLabels(states);
	let data = createStateCases(states);
	console.log(data);
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
	console.log(stateFormatted);
	return (
		<div>
			<Bar
				id="graph"
				data={stateFormatted}
				options={{
					title: {
						display: true,
						text: "Cases per State",
						fontSize: 20,
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
	);
}
