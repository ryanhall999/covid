import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { createStateLabels } from "./services";

export default function IndvState({ states }) {
	const [selected, setSelected] = useState("");

	let list = createStateLabels(states);

	function setActive(e) {
		e.preventDefault();
		console.log(e.target.textContent);
		setSelected(e.target.textContent);
	}

	console.log(selected);

	if (selected === "") {
		return (
			<div>
				<ListGroup as="ul">
					{list.map((state) => {
						return (
							<ListGroup.Item
								as="li"
								onClick={(e) => {
									setActive(e);
								}}
							>
								{state}
							</ListGroup.Item>
						);
					})}
				</ListGroup>
			</div>
		);
	} else {
		return (
			<div>
				<ListGroup as="ul">
					{list.map((state) => {
						return (
							<ListGroup.Item
								as="li"
								onClick={(e) => {
									setActive(e);
								}}
							>
								{state}
							</ListGroup.Item>
						);
					})}
				</ListGroup>
				<div>{selected}</div>
			</div>
		);
	}
}
