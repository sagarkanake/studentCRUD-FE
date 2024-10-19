import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentList from './StudentList';
import StudentForm from './StudentForm';
// import StudentDetails from './components/StudentDetails';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="container py-4">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Student Management System</Link>
            <div className="navbar-nav">
              <Link className="nav-link" to="/">Students</Link>
              {/* <Link className="nav-link" to="/add">Add Student</Link> */}
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/add" element={<StudentForm />} />
          <Route path="/edit/:id" element={<StudentForm />} />
          {/* <Route path="/student/:id" element={<StudentDetails />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;