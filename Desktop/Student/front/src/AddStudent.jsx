

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddStudent() {
	const [data, setData] = useState({
		name: '',
		usn: '',
		email: '',
		password: '',
		image: null,
	});
	const [errors, setErrors] = useState({}); // State to store validation errors
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();

		// Validate the form fields
		const formErrors = {};
		if (data.name.trim() === '') {
			formErrors.name = 'Name is required';
		}
		if (data.usn.trim() === '') {
			formErrors.usn = 'USN is required';
		}
		if (data.email.trim() === '') {
			formErrors.email = 'Email is required';
		}
		if (data.password.trim() === '') {
			formErrors.password = 'Password is required';
		}

		// Check if there are any errors
		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}

		const formdata = new FormData();
		formdata.append('name', data.name);
		formdata.append('usn', data.usn);
		formdata.append('email', data.email);
		formdata.append('password', data.password);
		formdata.append('image', data.image);

		axios
			.post('http://localhost:8081/create', formdata)
			.then((res) => {
				if (res.data.Status === 'Success') {
					navigate('/');
				} else {
					setErrors({ server: res.data.Error }); // Set server error message
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="d-flex flex-column align-items-center pt-4">
			<h2>Add Student</h2>
			<form className="row g-3 w-50" onSubmit={handleSubmit}>
				<div className="col-12">
					<label htmlFor="inputName" className="form-label">
						Name
					</label>
					<input
						type="text"
						className="form-control"
						id="inputName"
						placeholder="Enter Name"
						autoComplete="off"
						onChange={(e) => setData({ ...data, name: e.target.value })}
					/>
					{errors.name && <span className="text-danger">{errors.name}</span>}
				</div>
				<div className="col-12">
					<label htmlFor="inputUsn" className="form-label">
						USN
					</label>
					<input
						type="text"
						className="form-control"
						id="inputUsn"
						placeholder="Enter USN"
						autoComplete="off"
						onChange={(e) => setData({ ...data, usn: e.target.value })}
					/>
					{errors.usn && <span className="text-danger">{errors.usn}</span>}
				</div>
				<div className="col-12">
					<label htmlFor="inputEmail" className="form-label">
						Email
					</label>
					<input
						type="email"
						className="form-control"
						id="inputEmail"
						placeholder="Enter Email"
						autoComplete="off"
						onChange={(e) => setData({ ...data, email: e.target.value })}
					/>
					{errors.email && <span className="text-danger">{errors.email}</span>}
				</div>
				<div className="col-12">
					<label htmlFor="inputPassword" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						id="inputPassword"
						placeholder="Enter Password"
						autoComplete="off"
						onChange={(e) => setData({ ...data, password: e.target.value })}
					/>
					{errors.password && <span className="text-danger">{errors.password}</span>}
				</div>
				<div className="col-12">
					<label htmlFor="inputImage" className="form-label">
						Image
					</label>
					<input
						type="file"
						className="form-control"
						id="inputImage"
						accept=".jpg, .jpeg, .png"
						onChange={(e) => setData({ ...data, image: e.target.files[0] })}
					/>
				</div>
				{/* <div className="col-12">
					{errors.server && <span className="text-danger">{errors.server}</span>}
				</div> */}
				{errors.server && <div className="alert alert-danger">{errors.server}</div>}
				<div className="col-12">
					<button type="submit" className="btn btn-primary">
						Add Student
					</button>
				</div>
			</form>
		</div>
	);
}

export default AddStudent;

