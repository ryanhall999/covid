import React, { useEffect, useState } from "react";
import { Card, ListGroup, Button, Modal } from "react-bootstrap";

export default function MakeUS({ us }) {
	return (
		<Card style={{ width: "20rem" }}>
			<Card.Header style={{ fontWeight: "bold", fontSize: "2rem" }}>
				US
			</Card.Header>
			<ListGroup variant="flush">
				<ListGroup.Item>US New Confirmed: {us.NewConfirmed}</ListGroup.Item>
				<ListGroup.Item>US New Deaths: {us.NewDeaths}</ListGroup.Item>
				<ListGroup.Item>US New Recovered: {us.NewRecovered}</ListGroup.Item>
				<ListGroup.Item>US Total Confirmed: {us.TotalConfirmed}</ListGroup.Item>
				<ListGroup.Item>US Total Deaths: {us.TotalDeaths}</ListGroup.Item>
				<ListGroup.Item>US Total Recovered: {us.TotalRecovered}</ListGroup.Item>
				<ListGroup.Item>
					US Death per Confirmed:
					{((us.TotalDeaths / us.TotalConfirmed) * 100).toFixed(2)}%
				</ListGroup.Item>
				<ListGroup.Item>
					US Recovered per Confirmed:
					{((us.TotalRecovered / us.TotalConfirmed) * 100).toFixed(2)}%
				</ListGroup.Item>
			</ListGroup>
		</Card>
	);
}
