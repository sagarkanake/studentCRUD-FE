import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getStudents, deleteStudent } from './services/api';
import Pagination from './Pagination';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10); // Default limit

  useEffect(() => {
    fetchStudents();
  }, [currentPage, limit]);

  const fetchStudents = async () => {
    try {
      const response = await getStudents(currentPage, limit);
      console.log(" response ", response)
      setStudents(response.students);
      setTotalPages(Math.ceil(response.totalCount / limit));
      setLoading(false);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch students', 'error');
      setLoading(false);
    }
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value); // Update limit
    setCurrentPage(1); // Reset to first page on limit change
  };
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await deleteStudent(id);
        await fetchStudents();
        Swal.fire('Deleted!', 'Student has been deleted.', 'success');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to delete student', 'error');
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2>Students</h2>
        <Link to="/add" className="btn btn-primary">
          Add New Student
        </Link>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td> 
                  <td>{student.phone}</td>
                  <td>
                    {/* <Link
                      to={`/student/${student.id}`}
                      className="btn btn-info btn-sm me-2"
                    >
                      View
                    </Link> */}
                    <Link
                      to={`/edit/${student.id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <div className="mb-3">
    <label className="form-label">Choose Limit:</label>
    <select className="form-select" value={limit} onChange={handleLimitChange}>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
    </select>
  </div>

      </div>
    </div>
  );
}

export default StudentList;