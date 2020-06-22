import React, { useEffect, useState } from "react";
import { Card, ListGroup, Button, Modal } from "react-bootstrap";

export default function MakeUS({ us, global }) {
	return (
		<Card id="firstCard">
			<Card.Header id="topStat">US</Card.Header>
			<ListGroup variant="flush">
				<ListGroup.Item id="bkGrnd">
					US New Confirmed: {us.NewConfirmed}
				</ListGroup.Item>
				<ListGroup.Item id="bkGrnd">
					US New Deaths: {us.NewDeaths}
				</ListGroup.Item>
				<ListGroup.Item id="bkGrnd">
					US New Recovered: {us.NewRecovered}
				</ListGroup.Item>
				<ListGroup.Item id="bkGrnd">
					US Total Confirmed: {us.TotalConfirmed}
				</ListGroup.Item>
				<ListGroup.Item id="bkGrnd">
					US Total Deaths: {us.TotalDeaths}
				</ListGroup.Item>
				<ListGroup.Item id="bkGrnd">
					US Total Recovered: {us.TotalRecovered}
				</ListGroup.Item>
				<ListGroup.Item id="bkGrnd">
					US Death per Confirmed:
					{((us.TotalDeaths / us.TotalConfirmed) * 100).toFixed(2)}%
				</ListGroup.Item>
				<ListGroup.Item id="bkGrnd">
					US Recovered per Confirmed:
					{((us.TotalRecovered / us.TotalConfirmed) * 100).toFixed(2)}%
				</ListGroup.Item>
				<ListGroup.Item id="bkGrnd">
					US Cases of Worldwide Total:
					{((us.TotalConfirmed / global) * 100).toFixed(2)}%
				</ListGroup.Item>
			</ListGroup>
		</Card>
	);
}
