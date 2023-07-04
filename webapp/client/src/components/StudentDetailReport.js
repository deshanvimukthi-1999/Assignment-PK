import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDetailReport = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/Student');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const generateReport = async () => {
    if (!selectedStudent) {
      console.error('Please select a student.');
      return;
    }

    try {
      const response = await axios.get(`/api/StudentDetailReport/${selectedStudent.studentId}`);
      setReport(response.data);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const handleStudentChange = (e) => {
    const selectedStudentId = parseInt(e.target.value);
    const student = students.find((s) => s.studentId === selectedStudentId);
    setSelectedStudent(student);
  };

  return (
    <div>
      <h2>Generate Student Detail Report</h2>
      <div>
        <label htmlFor="student">Student *</label>
        <select id="student" onChange={handleStudentChange}>
          <option value="">Select a student</option>
          {students.map((student) => (
            <option key={student.studentId} value={student.studentId}>
              {student.firstName} {student.lastName}
            </option>
          ))}
        </select>
        <button onClick={generateReport}>Generate Report</button>
      </div>
      {report && (
        <div>
          <h3>Student Details</h3>
          <p>Student ID: {report.studentId}</p>
          <p>Contact Person: {report.contactPerson}</p>
          <p>Contact No.: {report.contactNo}</p>
          <p>Email Address: {report.emailAddress}</p>
          <p>Date of Birth: {report.dateOfBirth}</p>
          <p>Classroom: {report.classroom}</p>
          <h3>Subject & Teacher List</h3>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Teacher</th>
              </tr>
            </thead>
            <tbody>
              {report.subjectTeachers.map((subjectTeacher, index) => (
                <tr key={index}>
                  <td>{subjectTeacher.subject}</td>
                  <td>{subjectTeacher.teacher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentDetailReport;
