
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddAdmin() {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append("name", data.name);
        formdata.append("email", data.email);
        formdata.append("password", data.password);
        axios.post('http://localhost:8081/createAdmin', formdata)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/');
                } else {
                    setError(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Add Admin</h2>

            <form className="row g-3 w-50" onSubmit={handleSubmit}>
                <div className="col-12">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputName"
                        placeholder="Enter Name"
                        autoComplete="off"
                        onChange={e => setData({ ...data, name: e.target.value })}
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                        placeholder="Enter Email"
                        autoComplete="off"
                        onChange={e => setData({ ...data, email: e.target.value })}
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword4"
                        placeholder="Enter Password"
                        onChange={e => setData({ ...data, password: e.target.value })}
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    );
}

export default AddAdmin;
