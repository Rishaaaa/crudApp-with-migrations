
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net';

function Student() {
  const tableRef = useRef(null);
  let dataTableInstance;
  const navigate = useNavigate();
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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
          d.page = (d.start / d.length) + 1; // Calculate the page number
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
        { data: 'name' },
        { data: 'usn' },
        { data: 'email' },
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
      pagingType: 'full_numbers',
      pageLength: 10, // Number of students per page
      lengthMenu: [10, 25, 50, 75, 100],
      drawCallback: function () {
        $(tableRef.current)
          .find('.edit-btn')
          .on('click', function () {
            const id = $(this).data('id');
            handleEdit(id);
          });

        $(tableRef.current)
          .find('.delete-btn')
          .on('click', function () {
            const id = $(this).data('id');
            handleDelete(id);
          });
      },
    });
  };

  const destroyDataTables = () => {
    if (dataTableInstance) {
      $(tableRef.current).DataTable().destroy();
      dataTableInstance = null;
    }
  };

  const handleEdit = (id) => {
    navigate(`/studentEdit/${id}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/delete/${id}`)
      .then((res) => {
        if (res.data.Status === 'Success') {
          refreshData();
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };



  const refreshData = () => {
    if (dataTableInstance) {
      setCurrentPage(1); // Reset current page to 1
      dataTableInstance.ajax.reload(null, false);
    }
  };


  return (
    <div>
      <h1>Student List</h1>
      <table className="table table-bordered" ref={tableRef}>
        <thead>
          <tr>
            <th>Name</th>
            <th>USN</th>
            <th>Email</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
      </table>
      <div className="d-flex justify-content-end">
        <Link to="/create" className="btn btn-primary mt-3" >
          Add Student
        </Link>
        <br></br>
        <br></br>
      </div>

    </div>
  );
}

export default Student;








