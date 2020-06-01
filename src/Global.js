import React, { useEffect, useState } from "react";
import { Card, ListGroup, Button, Modal } from "react-bootstrap";

export default function MakeGlobal({ global }) {
	return (
		<Card
			style={{ width: "25rem", margin: ".5rem", backgroundColor: "#505357" }}
		>
			<Card.Header
				style={{
					fontWeight: "bold",
					fontSize: "2rem",
					alignSelf: "center",
					backgroundColor: "#505357",
				}}
			>
				Global
			</Card.Header>
			<ListGroup variant="flush">
				<ListGroup.Item
					style={{
						backgroundColor: "#505357",
					}}
				>
					Global New Confirmed: {global.NewConfirmed}
				</ListGroup.Item>
				<ListGroup.Item
					style={{
						backgroundColor: "#505357",
					}}
				>
					Global New Deaths: {global.NewDeaths}
				</ListGroup.Item>
				<ListGroup.Item
					style={{
						backgroundColor: "#505357",
					}}
				>
					Global New Recovered: {global.NewRecovered}
				</ListGroup.Item>
				<ListGroup.Item
					style={{
						backgroundColor: "#505357",
					}}
				>
					Global Total Confirmed: {global.TotalConfirmed}
				</ListGroup.Item>
				<ListGroup.Item
					style={{
						backgroundColor: "#505357",
					}}
				>
					Global Total Deaths: {global.TotalDeaths}
				</ListGroup.Item>
				<ListGroup.Item
					style={{
						backgroundColor: "#505357",
					}}
				>
					Global Total Recovered: {global.TotalRecovered}
				</ListGroup.Item>
				<ListGroup.Item
					style={{
						backgroundColor: "#505357",
					}}
				>
					Global Death per Confirmed:
					{((global.TotalDeaths / global.TotalConfirmed) * 100).toFixed(2)}%
				</ListGroup.Item>
				<ListGroup.Item
					style={{
						backgroundColor: "#505357",
					}}
				>
					Global Recovered per Confirmed:
					{((global.TotalRecovered / global.TotalConfirmed) * 100).toFixed(2)}%
				</ListGroup.Item>
			</ListGroup>
		</Card>
	);
}
