

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditStudent() {
	const [data, setData] = useState({
		name: '',
		usn: '',
		email: '',
	});
	const [errors, setErrors] = useState({}); // State to store validation errors
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		axios
			.get(`http://localhost:8081/get/${id}`)
			.then(res => {
				if (res.data.Status === 'Success') {
					const student = res.data.Result;
					setData({
						name: student.name,
						usn: student.usn,
						email: student.email,
					});
				} else {
					setErrors({ server: res.data.Error });
				}
			})
			.catch(err => {
				console.log(err);
				setErrors({ server: 'Error retrieving student details' });
			});
	}, [id]);

	const handleSubmit = event => {
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

		// Check if there are any errors
		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}

		axios
			.put(`http://localhost:8081/update/${id}`, data)
			.then(res => {
				if (res.data.Status === 'Success') {
					navigate('/');
				} else {
					setErrors({ server: res.data.Error });
				}
			})
			.catch(err => {
				if (err.response && err.response.data && err.response.data.Error) {
					setErrors({ server: err.response.data.Error });
				} else {
					console.log(err);
				}
			});
	};

	return (

		<div className="d-flex flex-column align-items-center pt-4">
			<div className='d-flex flex-column align-items-center pt-4 border shadow-lg w-50 bg-body-tertiary'>
				<br></br>
				<br></br>
				<h2>Update Student</h2>

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
							onChange={e => setData({ ...data, name: e.target.value })}
							value={data.name}
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
							onChange={e => setData({ ...data, usn: e.target.value })}
							value={data.usn}
						/>
						{errors.usn && <span className="text-danger">{errors.usn}</span>}
					</div>
					<div className="col-12">
						<label htmlFor="inputEmail4" className="form-label">
							Email
						</label>
						<input
							type="email"
							className="form-control"
							id="inputEmail4"
							placeholder="Enter Email"
							autoComplete="off"
							onChange={e => setData({ ...data, email: e.target.value })}
							value={data.email}
						/>
						{errors.email && <span className="text-danger">{errors.email}</span>}
					</div>
					<div className="col-12">
						{errors.server && <span className="text-danger">{errors.server}</span>}
					</div>
					<div className="col-12">
						<button type="submit" className="btn btn-primary">
							Update
						</button>
						<br></br>
						<br></br>
						<br></br>
					</div>
				</form>
			</div>
		</div>
	);
}

export default EditStudent;

