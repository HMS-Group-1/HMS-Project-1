import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';

export function Navy() {
	return (
		<Navbar bg="light" variant="light">
			<Container>
				<Navbar.Brand href="#home">BukaBuku</Navbar.Brand>
				<Nav className="d-flex justify-content-end">
					<Nav.Link href="#home">Home</Nav.Link>
					<Nav.Link href="#features">Login</Nav.Link>
					<Nav.Link href="#pricing">SignUp</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
}
