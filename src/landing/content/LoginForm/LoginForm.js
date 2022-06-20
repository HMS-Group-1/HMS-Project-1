import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import './LoginForm.css';

function LogInOut() {
	return (
		<Form className="bg-light">
			<Form.Group className="mb-3 " controlId="formBasicEmail">
				<Form.Control className=" form-control-lg" type="email" placeholder="Email / Username" />
			</Form.Group>

			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Control type="password" className=" form-control-lg" placeholder="Password" />
			</Form.Group>
			<Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
			<Button variant="primary" className="masukdaftar" type="submit">
				Masuk
			</Button>
			<br />
			<div className="d-flex justify-content-end">
				<button type="button" className="btn btn-link btn-sm">
					Lupa password?
				</button>
			</div>
			<hr />
			<Button variant="secondary" className="masukdaftar" type="submit">
				Daftar
			</Button>
		</Form>
	);
}

export default LogInOut;
