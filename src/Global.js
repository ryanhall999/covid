import React, { useEffect, useState } from "react";
import { Card, ListGroup, Button, Modal } from "react-bootstrap";

export default function MakeGlobal({ global }) {
	return (
		<Card style={{ width: "20rem" }}>
			<Card.Header style={{ fontWeight: "bold", fontSize: "2rem" }}>
				Global
			</Card.Header>
			<ListGroup variant="flush">
				<ListGroup.Item>
					Global New Confirmed: {global.NewConfirmed}
				</ListGroup.Item>
				<ListGroup.Item>Global New Deaths: {global.NewDeaths}</ListGroup.Item>
				<ListGroup.Item>
					Global New Recovered: {global.NewRecovered}
				</ListGroup.Item>
				<ListGroup.Item>
					Global Total Confirmed: {global.TotalConfirmed}
				</ListGroup.Item>
				<ListGroup.Item>
					Global Total Deaths: {global.TotalDeaths}
				</ListGroup.Item>
				<ListGroup.Item>
					Global Total Recovered: {global.TotalRecovered}
				</ListGroup.Item>
				<ListGroup.Item>
					Global Death per Confirmed:
					{((global.TotalDeaths / global.TotalConfirmed) * 100).toFixed(2)}%
				</ListGroup.Item>
				<ListGroup.Item>
					Global Recovered per Confirmed:
					{((global.TotalRecovered / global.TotalConfirmed) * 100).toFixed(2)}%
				</ListGroup.Item>
			</ListGroup>
		</Card>
	);
}
