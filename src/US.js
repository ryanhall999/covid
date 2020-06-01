import React, { useEffect, useState } from "react";
import { Card, ListGroup, Button, Modal } from "react-bootstrap";

export default function MakeUS({ us, global }) {
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
				US
			</Card.Header>
			<ListGroup variant="flush">
				<ListGroup.Item
					style={{
						backgroundColor: "#505357",
					}}
				>
					US New Confirmed: {us.NewConfirmed}
				</ListGroup.Item>
				<ListGroup.Item
					style={{
						backgroundColor: "#505357",
					}}
				>
					US New Deaths: {us.NewDeaths}
				</ListGroup.Item>
				<ListGroup.Item
					style={{
						backgroundColor: "#505357",
					}}
				>
					US New Recovered: {us.NewRecovered}
				</ListGroup.Item>
				<ListGroup.Item
					style={{
						backgroundColor: "#505357",
					}}
				>
					US Total Confirmed: {us.TotalConfirmed}
				</ListGroup.Item>
				<ListGroup.Item
					style={{
						backgroundColor: "#505357",
					}}
				>
					US Total Deaths: {us.TotalDeaths}
				</ListGroup.Item>
				<ListGroup.Item
					style={{
						backgroundColor: "#505357",
					}}
				>
					US Total Recovered: {us.TotalRecovered}
				</ListGroup.Item>
				<ListGroup.Item
					style={{
						backgroundColor: "#505357",
					}}
				>
					US Death per Confirmed:
					{((us.TotalDeaths / us.TotalConfirmed) * 100).toFixed(2)}%
				</ListGroup.Item>
				<ListGroup.Item
					style={{
						backgroundColor: "#505357",
					}}
				>
					US Recovered per Confirmed:
					{((us.TotalRecovered / us.TotalConfirmed) * 100).toFixed(2)}%
				</ListGroup.Item>
				<ListGroup.Item
					style={{
						backgroundColor: "#505357",
					}}
				>
					US Cases of Worldwide Total:
					{((us.TotalConfirmed / global) * 100).toFixed(2)}%
				</ListGroup.Item>
			</ListGroup>
		</Card>
	);
}
