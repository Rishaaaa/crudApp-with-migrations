

// // import axios from 'axios';
// // import React, { useEffect, useState, useRef } from 'react';
// // import { Link } from 'react-router-dom';
// // import { useNavigate } from 'react-router-dom';
// // import $ from 'jquery';
// // import 'datatables.net';

// // function Home() {
// //   const [adminCount, setAdminCount] = useState();
// //   const [studentCount, setStudentCount] = useState();
// //   const [adminData, setAdminData] = useState([]);
// //   const [studentData, setStudentData] = useState([]);
// //   const [totalRecords, setTotalRecords] = useState();
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const tableRef = useRef(null);

// //   let dataTableInstance;
// //   const navigate = useNavigate();


// //   useEffect(() => {
// //     initializeDataTables();
// //     return () => destroyDataTables();
// //   }, []);

// //   const initializeDataTables = () => {
// //     if ($.fn.DataTable.isDataTable(tableRef.current)) {
// //       destroyDataTables();
// //     }

// //     dataTableInstance = $(tableRef.current).DataTable({
// //       searching: true,
// //       serverSide: true,
// //       processing: true,
// //       ajax: {
// //         url: 'http://localhost:8081/getStudent',
// //         type: 'GET',


// //         data: function (d) {
// //           d.searchValue = d.search.value;
// //           d.filterValue = d.columns[d.order[0].column].data;
// //           d.page = (d.start / d.length) + 1; // Calculate the page number
// //           d.length = d.length; // Number of students per page
// //           d.sortBy = d.columns[d.order[0].column].data;
// //           d.sortDir = d.order[0].dir;
// //           return d;
// //         },


// //         dataSrc: function (response) {
// //           const data = response.data; // Extract the data from the response
// //           setTotalRecords(response.recordsTotal); // Update total records
// //           setCurrentPage(response.draw); // Update current page
// //           return data;
// //         },
// //         error: function (xhr, error, thrown) {
// //           console.log('Error:', error);
// //         },
// //       },
// //       columns: [
// //         { data: 'name' },
// //         { data: 'usn' },
// //         { data: 'email' },
// //         {
// //           data: 'image',
// //           render: function (data) {
// //             return `<img src="http://localhost:8081/images/${data}" alt="" class="student_image" />`;
// //           },
// //         },
// //         {
// //           data: 'id',
// //           render: function (data) {
// //             return `
// //               <div>
// //                 <button class="btn btn-primary btn-sm me-2 edit-btn" data-id="${data}">Edit</button>
// //                 <button class="btn btn-sm btn-danger delete-btn" data-id="${data}">Delete</button>
// //               </div>`;
// //           },
// //         },
// //       ],
// //       pagingType: 'full_numbers',
// //       pageLength: 10, // Number of students per page
// //       lengthMenu: [10, 25, 50, 75, 100],
// //       drawCallback: function () {
// //         $(tableRef.current)
// //           .find('.edit-btn')
// //           .on('click', function () {
// //             const id = $(this).data('id');
// //             handleEdit(id);
// //           });

// //         $(tableRef.current)
// //           .find('.delete-btn')
// //           .on('click', function () {
// //             const id = $(this).data('id');
// //             handleDelete(id);
// //           });
// //       },

// //     });


// //     // Add click event listener for edit buttons
// //     $(tableRef.current).on('click', '.edit-btn', function () {
// //       const id = $(this).data('id');
// //       handleEdit(id);
// //     });

// //     // Add click event listener for delete buttons
// //     $(tableRef.current).on('click', '.delete-btn', function () {
// //       const id = $(this).data('id');
// //       handleDelete(id);
// //     });
// //   };

// //   const destroyDataTables = () => {
// //     if (dataTableInstance) {
// //       dataTableInstance.destroy();
// //       dataTableInstance = null;
// //     }
// //   };

// //   const handleEdit = (id) => {
// //     // Navigate to the studentEdit page with the respective ID
// //     navigate(`/studentEdit/${id}`);
// //   };


// //   const refreshData = () => {
// //     if (dataTableInstance) {
// //       dataTableInstance.ajax.reload();
// //     }
// //   };

// //   useEffect(() => {
// //     axios.get('http://localhost:8081/getAdmin')
// //       .then(res => {
// //         if (res.data.Status === 'Success') {
// //           setAdminData(res.data.Result);
// //         } else {
// //           alert('Error');
// //         }
// //       })
// //       .catch(err => console.log(err));
// //   }, []);

// //   useEffect(() => {
// //     axios.get('http://localhost:8081/getStudent')
// //       .then(res => {
// //         if (res.data.Status === 'Success') {
// //           setStudentData(res.data.Result);
// //         } else {
// //           alert('Error');
// //         }
// //       })
// //       .catch(err => console.log(err));
// //   }, []);


// //   useEffect(() => {
// //     axios.get('http://localhost:8081/adminCount')
// //       .then(res => {
// //         setAdminCount(res.data.admin);
// //       })
// //       .catch(err => console.log(err));

// //     axios.get('http://localhost:8081/studentCount')
// //       .then(res => {
// //         setStudentCount(res.data.student);
// //       })
// //       .catch(err => console.log(err));
// //   }, []);

// //   const handleDelete = (id) => {
// //     axios.delete('http://localhost:8081/delete/' + id)
// //       .then(res => {
// //         if (res.data.Status === 'Success') {
// //           window.location.reload(true);
// //         } else {
// //           alert('Error');
// //         }
// //       })
// //       .catch(err => console.log(err));
// //   };

// //   const handleDeleteAdmin = (id) => {
// //     axios.delete('http://localhost:8081/deleteAdmin/' + id)
// //       .then(res => {
// //         if (res.data.Status === 'Success') {
// //           window.location.reload(true);
// //         } else {
// //           alert('Error');
// //         }
// //       })
// //       .catch(err => console.log(err));
// //   };

// //   return (
// //     <div>
// //       <div className='p-3 d-flex justify-content-around mt-3'>
// //         <div className='px-3 pt-2 pb-3 border shadow-sm w-45'>
// //           <div className='text-center pb-1'>
// //             <h4>Admin</h4>
// //           </div>
// //           <hr />
// //           <div className=''>
// //             <h5>Total: {adminCount}</h5>
// //             <hr></hr>
// //             <div className='mt-4 px-5 pt-3'>
// //               <h3>List of Admins</h3>

// //               <table className='table'>
// //                 <thead>
// //                   <tr>
// //                     <th>Email</th>
// //                     <th>Action</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {adminData.map((admin, index) => (
// //                     <tr key={index}>
// //                       <td>{admin.email}</td>
// //                       <td>
// //                         {/* <Link to={`/userEdit/${admin.id}`} className='btn btn-primary btn-sm me-2'>edit</Link> */}
// //                         <button onClick={() => handleDeleteAdmin(admin.id)} className='btn btn-sm btn-danger'>delete</button>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //                 <hr></hr>
// //                 <Link to='/createAdmin' className='btn btn-success'>Add Admin</Link>
// //               </table>
// //             </div>
// //           </div>
// //         </div>

// //         <div className='px-5 pt-2 pb-5 border shadow-sm w-75'>
// //           <div className='text-center pb-1'>
// //             <h4>Student</h4>
// //           </div>
// //           <hr />
// //           <div className=''>
// //             <h5>Total: {studentCount}</h5>
// //             <hr></hr>
// //             <div className='px-5 py-3'>
// //               <div className='d-flex justify-content-center mt-2'>
// //                 <h3>Student List</h3>
// //               </div>

// //               <div className='mt-3'>

// //                 <table className="table table-striped" ref={tableRef}>
// //                   <thead>
// //                     <tr>
// //                       <th>Name</th>
// //                       <th>USN</th>
// //                       <th>Email</th>
// //                       <th>Image</th>
// //                       <th>Actions</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody></tbody>
// //                 </table>
// //                 <hr></hr>
// //                 <Link to="/create" className="btn btn-success">
// //                   Add Student
// //                 </Link>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Home;



// import axios from 'axios';
// import React, { useEffect, useState, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
// import '@fortawesome/fontawesome-free/css/all.css'; // Import FontAwesome CSS

// function Home() {
//   const [adminCount, setAdminCount] = useState();
//   const [studentCount, setStudentCount] = useState();
//   const [adminData, setAdminData] = useState([]);
//   const [studentData, setStudentData] = useState([]);
//   const [totalRecords, setTotalRecords] = useState();
//   const [currentPage, setCurrentPage] = useState(1);
//   const tableRef = useRef(null);

//   let dataTableInstance;
//   const navigate = useNavigate();

//   useEffect(() => {
//     initializeDataTables();
//     return () => destroyDataTables();
//   }, []);

//   const initializeDataTables = () => {
//     if ($.fn.DataTable.isDataTable(tableRef.current)) {
//       destroyDataTables();
//     }

//     dataTableInstance = $(tableRef.current).DataTable({
//       searching: true,
//       serverSide: true,
//       processing: true,

//       rowCallback: function (row, data) {
//         $(row).hover(
//           function () {
//             $(this).addClass("table-hover");
//           },
//           function () {
//             $(this).removeClass("table-hover");
//           }
//         );
//       },

//       ajax: {
//         url: 'http://localhost:8081/getStudent',
//         type: 'GET',
//         data: function (d) {
//           d.searchValue = d.search.value;
//           d.filterValue = d.columns[d.order[0].column].data;
//           d.page = d.start / d.length + 1; // Calculate the page number
//           d.length = d.length; // Number of students per page
//           d.sortBy = d.columns[d.order[0].column].data;
//           d.sortDir = d.order[0].dir;
//           return d;
//         },
//         dataSrc: function (response) {
//           const data = response.data; // Extract the data from the response
//           setTotalRecords(response.recordsTotal); // Update total records
//           setCurrentPage(response.draw); // Update current page
//           return data;
//         },
//         error: function (xhr, error, thrown) {
//           console.log('Error:', error);
//         },
//       },


//       columns: [

//         {
//           data: 'name',
//           render: function (data) {
//             return data;
//           },
//         },
//         {
//           data: 'usn',
//           render: function (data) {
//             return data;
//           },
//         },
//         {
//           data: 'email',
//           render: function (data) {
//             return data;
//           },
//         },
//         {
//           data: 'image',
//           render: function (data) {
//             return `<img src="http://localhost:8081/images/${data}" alt="" class="student_image" />`;
//           },
//         },
//         {
//           data: 'id',
//           render: function (data) {
//             return `
//               <div>
//                 <button class="btn btn-primary btn-sm me-2 edit-btn" data-id="${data}">Edit</button>
//                 <button class="btn btn-sm btn-danger delete-btn" data-id="${data}">Delete</button>
//               </div>`;
//           },
//         },
//       ],
//       pagingType: 'simple_numbers',
//       lengthMenu: [10, 25, 50, 100],
//       pageLength: 10,
//       drawCallback: function () {
//         $(tableRef.current)
//           .find('.edit-btn')
//           .on('click', function () {
//             const id = $(this).data('id');
//             handleEdit(id);
//           });

//         $(tableRef.current)
//           .find('.delete-btn')
//           .on('click', function () {
//             const id = $(this).data('id');
//             handleDelete(id);
//           });


//       },
//     });

//   };

//   const destroyDataTables = () => {
//     if (dataTableInstance) {
//       dataTableInstance.destroy();
//       dataTableInstance = null;
//     }
//   };

//   const handleEdit = (id) => {
//     // Navigate to the studentEdit page with the respective ID
//     navigate(`/studentEdit/${id}`);
//   };


//   const refreshData = () => {
//     if (dataTableInstance) {
//       dataTableInstance.ajax.reload();
//     }
//   };

//   useEffect(() => {
//     axios.get('http://localhost:8081/getAdmin')
//       .then(res => {
//         if (res.data.Status === 'Success') {
//           setAdminData(res.data.Result);
//         } else {
//           alert('Error');
//         }
//       })
//       .catch(err => console.log(err));
//   }, []);

//   useEffect(() => {
//     axios.get('http://localhost:8081/getStudent')
//       .then(res => {
//         if (res.data.Status === 'Success') {
//           setStudentData(res.data.Result);
//         } else {
//           alert('Error');
//         }
//       })
//       .catch(err => console.log(err));
//   }, []);


//   useEffect(() => {
//     axios.get('http://localhost:8081/adminCount')
//       .then(res => {
//         setAdminCount(res.data.admin);
//       })
//       .catch(err => console.log(err));

//     axios.get('http://localhost:8081/studentCount')
//       .then(res => {
//         setStudentCount(res.data.student);
//       })
//       .catch(err => console.log(err));
//   }, []);

//   const handleDelete = (id) => {
//     axios.delete('http://localhost:8081/delete/' + id)
//       .then(res => {
//         if (res.data.Status === 'Success') {
//           window.location.reload(true);
//         } else {
//           alert('Error');
//         }
//       })
//       .catch(err => console.log(err));
//   };

//   const handleDeleteAdmin = (id) => {
//     axios.delete('http://localhost:8081/deleteAdmin/' + id)
//       .then(res => {
//         if (res.data.Status === 'Success') {
//           window.location.reload(true);
//         } else {
//           alert('Error');
//         }
//       })
//       .catch(err => console.log(err));
//   };
 
//   return (
//     <div>
//       <div className='p-3 d-flex justify-content-around mt-3'>
//         <div className='px-3 pt-2 pb-3 border shadow-sm w-45'>
//           <div className='text-center pb-1'>
//             <h4>Admin</h4>
//           </div>
//           <hr />
//           <div className=''>
//             <h5>Total: {adminCount}</h5>
//             <hr></hr>
//             <div className='mt-4 px-5 pt-3'>
//               <h3><u>List of Admins</u></h3>
//               <br></br>
//               <table className='table'>
//                 <thead>
//                   <tr>
//                     <th>Email</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {adminData.map((admin, index) => (
//                     <tr key={index}>
//                       <td>{admin.email}</td>
//                       <td>
//                         {/* <Link to={`/userEdit/${admin.id}`} className='btn btn-primary btn-sm me-2'>edit</Link> */}
//                         <button onClick={() => handleDeleteAdmin(admin.id)} className='btn btn-sm btn-danger'>delete</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//                 <hr></hr>
//                 <Link to='/createAdmin' className='btn btn-success'>Add Admin</Link>
//               </table>
//             </div>
//           </div>
//         </div>

//         <div className='px-5 pt-2 pb-5 border shadow-sm w-75'>
//           <div className='text-center pb-1'>
//             <h4>Student</h4>
//           </div>
//           <hr />
//           <div className=''>
//             <h5>Total: {studentCount}</h5>
//             <hr></hr>
//             <div className='px-5 py-3'>
//               <div className='d-flex justify-content-center mt-2'>
//                 <h3><u>Student List</u></h3>
//               </div>

//               <div className='mt-3'>

//                 <table className="table table-striped" ref={tableRef}>
//                   <thead>
//                     <br></br>
//                     <tr>
//                       <th>Name</th>
//                       <th>USN</th>
//                       <th>Email</th>
//                       <th>Image</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody></tbody>
//                 </table>
//                 <hr></hr>
//                 <Link to="/create" className="btn btn-success">
//                   Add Student
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;

import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
import '@fortawesome/fontawesome-free/css/all.css'; // Import FontAwesome CSS

function Home() {
  const [adminCount, setAdminCount] = useState();
  const [studentCount, setStudentCount] = useState();
  const [adminData, setAdminData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [totalRecords, setTotalRecords] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const tableRef = useRef(null);

  let dataTableInstance;
  const navigate = useNavigate();

  useEffect(() => {
    initializeDataTables();
    return () => destroyDataTables();
  }, []);

  const initializeDataTables = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      destroyDataTables();
    }

    dataTableInstance = $(tableRef.current).DataTable({
      searching: true,
      serverSide: true,
      processing: true,
      ajax: {
        url: 'http://localhost:8081/getStudent',
        type: 'GET',
        data: function (d) {
          d.searchValue = d.search.value;
          d.filterValue = d.columns[d.order[0].column].data;
          d.page = d.start / d.length + 1; // Calculate the page number
          d.length = d.length; // Number of students per page
          d.sortBy = d.columns[d.order[0].column].data;
          d.sortDir = d.order[0].dir;
          return d;
        },
        dataSrc: function (response) {
          const data = response.data; // Extract the data from the response
          setTotalRecords(response.recordsTotal); // Update total records
          setCurrentPage(response.draw); // Update current page
          return data;
        },
        error: function (xhr, error, thrown) {
          console.log('Error:', error);
        },
      },
      columns: [
        {
          data: 'name',
          render: function (data) {
            return data;
          },
        },
        {
          data: 'usn',
          render: function (data) {
            return data;
          },
        },
        {
          data: 'email',
          render: function (data) {
            return data;
          },
        },
        {
          data: 'image',
          render: function (data) {
            return `<img src="http://localhost:8081/images/${data}" alt="" class="student_image" />`;
          },
        },
        {
          data: 'id',
          render: function (data) {
            return `
              <div>
                <button class="btn btn-primary btn-sm me-2 edit-btn" data-id="${data}">Edit</button>
                <button class="btn btn-sm btn-danger delete-btn" data-id="${data}">Delete</button>
              </div>`;
          },
        },
      ],
      pagingType: 'simple_numbers',
      lengthMenu: [10, 25, 50, 100],
      pageLength: 10,
      drawCallback: function () {
        $(tableRef.current)
          .find('.edit-btn')
          .on('click', function () {
            event.stopPropagation();
            const id = $(this).data('id');
            handleEdit(id);
          });

        // $(tableRef.current)
        //   .find('.delete-btn')
        //   .on('click', function () {
        //     const id = $(this).data('id');
        //     handleDelete(id);
        //   });


        $(tableRef.current)
          .find('.delete-btn')
          .on('click', function (event) {
            event.stopPropagation(); // Stop click event propagation
            const id = $(this).data('id');
            handleDelete(id);
          });
      },

      rowCallback: function (row, data) {
        $(row).hover(
          function () {
            $(this).addClass('table-secondary');
          },
          function () {
            $(this).removeClass('table-secondary');
          }
        );

        $(row).on('click', function () {
          const id = data.id;
          navigate(`/studentprofile/${id}`);
        });
      },
    });
  };

  const destroyDataTables = () => {
    if (dataTableInstance) {
      dataTableInstance.destroy();
      dataTableInstance = null;
    }
  };

  const handleEdit = (id) => {
    // Navigate to the studentEdit page with the respective ID
    navigate(`/studentEdit/${id}`);
  };

  const refreshData = () => {
    if (dataTableInstance) {
      dataTableInstance.ajax.reload();
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:8081/getAdmin')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setAdminData(res.data.Result);
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8081/getStudent')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setStudentData(res.data.Result);
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8081/adminCount')
      .then((res) => {
        setAdminCount(res.data.admin);
      })
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:8081/studentCount')
      .then((res) => {
        setStudentCount(res.data.student);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete('http://localhost:8081/delete/' + id)
      .then((res) => {
        if (res.data.Status === 'Success') {
          window.location.reload(true);
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteAdmin = (id) => {
    axios
      .delete('http://localhost:8081/deleteAdmin/' + id)
      .then((res) => {
        if (res.data.Status === 'Success') {
          window.location.reload(true);
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  };

  return (

    <div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className='p-3 d-flex justify-content-around mt-3 bg-body-tertiary'>

            <div className='px-3 pt-2 pb-3 border shadow-sm w-45 bg-white'>
              <div className='text-center pb-1'>
                <h4>Admin</h4>
              </div>
              <hr />
              <div className=''>
                <h5>Total: {adminCount}</h5>
                <hr></hr>
                <div className='mt-4 px-5 pt-3'>
                  <h3><u>List of Admins</u></h3>
                  <br></br>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminData.map((admin, index) => (
                        <tr key={index}>
                          <td>{admin.email}</td>
                          <td>
                            {/* <Link to={`/userEdit/${admin.id}`} className='btn btn-primary btn-sm me-2'>edit</Link> */}
                            <button onClick={() => handleDeleteAdmin(admin.id)} className='btn btn-sm btn-danger'>delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <hr></hr>
                    <Link to='/createAdmin' className='btn btn-success'>Add Admin</Link>
                  </table>
                </div>
              </div>
            </div>

            <div className='px-5 pt-2 pb-5 border shadow-sm w-75 bg-white'>
              <div className='text-center pb-1'>
                <h4>Student</h4>
              </div>
              <hr />
              <div className=''>
                <h5>Total: {studentCount}</h5>
                <hr></hr>
                <div className='px-5 py-3'>
                  <div className='d-flex justify-content-center mt-2'>
                    <h3><u>Student List</u></h3>
                  </div>

                  <div className='mt-3'>
                    {/* <div class="table-responsive"> */}
                    <table className="table table-striped " ref={tableRef}>
                      <thead>
                        <br></br>
                        <tr>
                          <th>Name</th>
                          <th>USN</th>
                          <th>Email</th>
                          <th>Image</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                    {/* </div> */}
                    <hr></hr>
                    <Link to="/create" className="btn btn-success">
                      Add Student
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div></div>
    </div>
  );
}

export default Home;

