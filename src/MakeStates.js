import React, { useEffect, useState } from "react";
import { Card, ListGroup, Button, Modal } from "react-bootstrap";

export default function MakeStates({ states }) {
	if (states[0] !== undefined) {
		return (
			<div id="statesList">
				{states.map((state) => {
					return (
						<div key={state.state} id="state">
							<Card style={{ width: "20rem" }}>
								<Card.Header style={{ fontWeight: "bold", fontSize: "2rem" }}>
									{state.state}
								</Card.Header>
								<ListGroup variant="flush">
									<ListGroup.Item>
										{state.state} Total Confirmed: {state.positive}
									</ListGroup.Item>
									<ListGroup.Item>
										{state.state} Total Deaths: {state.death}
									</ListGroup.Item>
									<ListGroup.Item>
										{state.state} Total Recovered: {state.recovered}
									</ListGroup.Item>
									<ListGroup.Item>
										{state.state} Death per Confirmed:
										{((state.death / state.positive) * 100).toFixed(2)}%
									</ListGroup.Item>
									<ListGroup.Item>
										{state.state} Recovered per Confirmed:
										{((state.recovered / state.positive) * 100).toFixed(2)}%
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</div>
					);
				})}
			</div>
		);
	} else {
		return <div></div>;
	}
}
