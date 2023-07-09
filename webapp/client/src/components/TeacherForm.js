import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherForm = () => {
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState({
    firstName: '',
    lastName: '',
    contactNo: '',
    emailAddress: '',
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('/api/Teacher');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleInputChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/Teacher', teacher);

      if (response.status === 201) {
        const newTeacher = response.data;
        setTeachers([...teachers, newTeacher]);
        setTeacher({
          firstName: '',
          lastName: '',
          contactNo: '',
          emailAddress: '',
        });
      } else {
        console.error('Failed to create teacher:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating teacher:', error);
    }
  };

  return (
    <div>
      <h2>Teacher Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={teacher.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={teacher.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="contactNo">Contact Number:</label>
          <input
            type="text"
            id="contactNo"
            name="contactNo"
            value={teacher.contactNo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="emailAddress">Email Address:</label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            value={teacher.emailAddress}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Create Teacher</button>
      </form>
    </div>
  );
};

export default TeacherForm;
