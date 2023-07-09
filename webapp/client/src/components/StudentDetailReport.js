import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDetailReport = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [contactPerson, setContactPerson] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [classroom, setClassroom] = useState('');
  const [subjectTeacherList, setSubjectTeacherList] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/StudentDetailReport/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleSelectedStudentChange = (e) => {
    const selectedStudentId = parseInt(e.target.value);
    const student = students.find((s) => s.id === selectedStudentId);
    setSelectedStudent(student);
  };

  const handleGenerateReport = () => {
    if (!selectedStudent) {
      console.error('Please select a student.');
      return;
    }

    // Retrieve student's information from the selected student object
    const { contactPerson, contactNo, email, dateOfBirth, classroom, subjectTeacherList } = selectedStudent;

    setContactPerson(contactPerson);
    setContactNo(contactNo);
    setEmail(email);
    setDateOfBirth(dateOfBirth);
    setClassroom(classroom);
    setSubjectTeacherList(subjectTeacherList);
  };

  return (
    <div>
      <h2>Student Detail Report</h2>
      <div>
        <label htmlFor="student">Student:</label>
        <select id="student" onChange={handleSelectedStudentChange} required>
          <option value="">Select a student</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.firstName} {student.lastName}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleGenerateReport}>Generate Report</button>

      {selectedStudent && (
        <div>
          <h3>Student Information</h3>
          <p>Contact Person: {contactPerson}</p>
          <p>Contact No.: {contactNo}</p>
          <p>Email: {email}</p>
          <p>Date of Birth: {dateOfBirth}</p>
          <p>Classroom: {classroom}</p>

          <h3>Subject & Teacher List</h3>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Teacher</th>
              </tr>
            </thead>
            <tbody>
              {subjectTeacherList.map((item) => (
                <tr key={item.id}>
                  <td>{item.subject}</td>
                  <td>{item.teacher}</td>
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
