import React, { useEffect, useState } from "react";
import { Card, ListGroup, Button, Nav, Navbar } from "react-bootstrap";
import MakeStates from "./MakeStates";

export default function NavBar() {
	return (
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand href="#home">Ryan's Covid Tracker</Navbar.Brand>
			<Nav className="mr-auto">
				<Nav.Link href="#home">Home</Nav.Link>
				<Nav.Link href="#lists" component={MakeStates}>
					Lists
				</Nav.Link>
				<Nav.Link href="#graphs">Graphs</Nav.Link>
			</Nav>
			<Button variant="primary" onClick={handleClick}>
				Refresh
			</Button>
		</Navbar>
	);
}
