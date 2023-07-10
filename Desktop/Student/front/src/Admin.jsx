import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Admin() {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/getAdmin')
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:8081/deleteAdmin/' + id)
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.reload(true);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='px-5 py-3'>
            <div className='d-flex justify-content-center mt-2'>
                <h3>Admin List</h3>
            </div>
            <Link to="/createAdmin" className='btn btn-success'>Add Admin</Link>
            <div className='mt-3'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((users, index) => {
                            return <tr key={index}>
                                <td>{users.email}</td>
                                <td>
                                    {/* <Link to={`/AdminEdit/` + users.id} className='btn btn-primary btn-sm me-2'>edit</Link> */}
                                    <button onClick={e => handleDelete(users.id)} className='btn btn-sm btn-danger'>delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Admin

