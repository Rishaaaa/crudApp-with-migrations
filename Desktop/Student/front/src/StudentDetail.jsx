

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function StudentDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/getProfile/${id}`)
            .then((res) => {
                if (res.data.status === 'Success') {
                    setStudent(res.data.result);
                } else {
                    console.log('Student not found');
                }
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleLogout = () => {
        axios
            .get('http://localhost:8081/logout')
            .then((res) => {
                navigate('/start');
            })
            .catch((err) => console.log(err));
    };

    if (!student) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="d-flex flex-column align-items-center pt-4">
                <div className='d-flex flex-column align-items-center pt-4 border shadow-lg w-50 bg-body-tertiary'>
                    <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <img src={`http://localhost:8081/images/${student.image}`} alt='' className='empImg' />
                        <div className='d-flex align-items-center flex-column mt-5'>
                            <h3>Name: {student.name}</h3>
                            <h3>Usn: {student.usn}</h3>
                            <h3>Email: {student.email}</h3>
                        </div>
                        <div>
                            <Link to={`/profileEdit/${id}`} className='btn btn-primary me-2'>
                                Edit
                            </Link>
                            <button className='btn btn-danger' onClick={handleLogout}>
                                Logout
                            </button>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentDetail;
