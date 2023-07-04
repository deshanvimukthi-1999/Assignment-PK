import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentRegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState('');

  useEffect(() => {
    // Fetch the list of classrooms from the backend API
    axios.get('/api/Student')
      .then(response => {
        setClassrooms(response.data);
      })
      .catch(error => {
        console.error('Error fetching classrooms:', error);
      });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    // Perform form validation and submit the student registration data
    // to the backend API for further processing
    const studentData = {
      firstName,
      lastName,
      contactPerson,
      contactNo,
      email,
      dob,
      age,
      classroomId: selectedClassroom
    };

    axios.post('/api/Student', studentData)
      .then(response => {
        // Handle successful registration
        console.log('Student registration successful:', response.data);
        // Reset form fields
        setFirstName('');
        setLastName('');
        setContactPerson('');
        setContactNo('');
        setEmail('');
        setDob('');
        setAge('');
        setSelectedClassroom('');
      })
      .catch(error => {
        console.error('Error registering student:', error);
      });
  };

  return (
    <div>
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contact Person:</label>
          <input
            type="text"
            value={contactPerson}
            onChange={e => setContactPerson(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contact No:</label>
          <input
            type="text"
            value={contactNo}
            onChange={e => setContactNo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email Address:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={e => setDob(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={e => setAge(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Classroom:</label>
          <select
            value={selectedClassroom}
            onChange={e => setSelectedClassroom(e.target.value)}
            required
          >
            <option value="">Select Classroom</option>
            {classrooms.map(classroom => (
              <option key={classroom.id} value={classroom.id}>
                {classroom.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default StudentRegistrationForm;
