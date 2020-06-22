import React, { useEffect, useState } from "react";
import { Card, ListGroup, Button, Modal } from "react-bootstrap";

export default function MakeGlobal({ global }) {
	return (
		<Card id="firstCard">
			<Card.Header id="topStat">Global</Card.Header>
			<ListGroup variant="flush">
				<ListGroup.Item id="bkGrnd">
					Global New Confirmed: {global.NewConfirmed}
				</ListGroup.Item>
				<ListGroup.Item id="bkGrnd">
					Global New Deaths: {global.NewDeaths}
				</ListGroup.Item>
				<ListGroup.Item id="bkGrnd">
					Global New Recovered: {global.NewRecovered}
				</ListGroup.Item>
				<ListGroup.Item id="bkGrnd">
					Global Total Confirmed: {global.TotalConfirmed}
				</ListGroup.Item>
				<ListGroup.Item id="bkGrnd">
					Global Total Deaths: {global.TotalDeaths}
				</ListGroup.Item>
				<ListGroup.Item id="bkGrnd">
					Global Total Recovered: {global.TotalRecovered}
				</ListGroup.Item>
				<ListGroup.Item id="bkGrnd">
					Global Death per Confirmed:
					{((global.TotalDeaths / global.TotalConfirmed) * 100).toFixed(2)}%
				</ListGroup.Item>
				<ListGroup.Item id="bkGrnd">
					Global Recovered per Confirmed:
					{((global.TotalRecovered / global.TotalConfirmed) * 100).toFixed(2)}%
				</ListGroup.Item>
			</ListGroup>
		</Card>
	);
}
