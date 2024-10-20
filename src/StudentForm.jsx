import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createStudent, updateStudent, getStudentById } from './services/api';

function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    marks: [{ subject: '', marks: '' }]
  });

  useEffect(() => {
    if (id) {
      fetchStudent();
    }
  }, [id]);

  const fetchStudent = async () => {
    try {
      const data = await getStudentById(id);
      console.log(' data ' , data )
      setFormData(data);
      console.log( formData )
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch student data', 'error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMarksChange = (index, field, value) => {
    const newMarks = [...formData.marks];
    newMarks[index][field] = value;
    setFormData(prev => ({
      ...prev,
      marks: newMarks
    }));
  };

  const addMark = () => {
    setFormData(prev => ({
      ...prev,
      marks: [...prev.marks, { subject: '', marks: '' }]
    }));
  };

  const removeMark = (index) => {
    setFormData(prev => ({
      ...prev,
      marks: prev.marks.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateStudent(id, formData);
        Swal.fire('Success', 'Student updated successfully', 'success');
      } else {
        await createStudent(formData);
        Swal.fire('Success', 'Student added successfully', 'success');
      }
      navigate('/');
    } catch (error) {
        console.log(" error ", error)
        if (error.response && error.response.data.error) {
            setErrorMessage(error.response.data.error); // Set the error message from the response
          } else {
            setErrorMessage('An unexpected error occurred.'); // Fallback error message
          }
          Swal.fire('Error', errorMessage, 'error');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>{id ? 'Edit Student' : 'Add New Student'}</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div> */}

          <div className="mb-3">
            <label className="form-label">Marks</label>
            {formData.marks.map((mark, index) => (
              <div key={index} className="row mb-2">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    value={mark.subject}
                    onChange={(e) => handleMarksChange(index, 'subject', e.target.value)}
                    required
                  />
                </div>
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="marks"
                    value={mark.marks}
                     min="0"
                    max="100"
                    onChange={(e) => handleMarksChange(index, 'marks', e.target.value)}
                    required
                  />
                </div>
                <div className="col-auto">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeMark(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={addMark}
            >
              Add Mark
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            {id ? 'Update' : 'Create'} Student
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;