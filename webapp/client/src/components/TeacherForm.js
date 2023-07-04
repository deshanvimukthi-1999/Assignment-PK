import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherForm = () => {
  const [teachers, setTeachers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('/api/teacher');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();

    if (!firstName || !contactNo || !emailAddress) {
      console.error('Please fill in all required fields.');
      return;
    }

    const teacher = {
      firstName,
      lastName,
      contactNo,
      emailAddress,
    };

    try {
      const response = await axios.post('/api/teacher', teacher);

      if (response.status === 201) {
        const data = response.data;
        setTeachers([...teachers, data]);
        resetForm();
      } else {
        console.error('Failed to add teacher:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
  };

  const handleEditTeacher = async (e) => {
    e.preventDefault();

    if (!firstName || !contactNo || !emailAddress) {
      console.error('Please fill in all required fields.');
      return;
    }

    const updatedTeacher = {
      ...selectedTeacher,
      firstName,
      lastName,
      contactNo,
      emailAddress,
    };

    try {
      const response = await axios.put(
        `/api/Teacher/${selectedTeacher.teacherId}`,
        updatedTeacher
      );

      if (response.status === 200) {
        const data = response.data;
        const updatedTeachers = teachers.map((t) =>
          t.teacherId === data.teacherId ? data : t
        );
        setTeachers(updatedTeachers);
        resetForm();
      } else {
        console.error('Failed to update teacher:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };

  const handleDeleteTeacher = async (teacherId) => {
    try {
      const response = await axios.delete(`/api/teacher/${teacherId}`);

      if (response.status === 200) {
        const updatedTeachers = teachers.filter((t) => t.teacherId !== teacherId);
        setTeachers(updatedTeachers);
      } else {
        console.error('Failed to delete teacher:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  const selectTeacher = (teacher) => {
    setSelectedTeacher(teacher);
    setFirstName(teacher.firstName);
    setLastName(teacher.lastName);
    setContactNo(teacher.contactNo);
    setEmailAddress(teacher.emailAddress);
  };

  const resetForm = () => {
    setSelectedTeacher(null);
    setFirstName('');
    setLastName('');
    setContactNo('');
    setEmailAddress('');
  };

  return (
    <div>
      <h2>Add/Edit Teacher</h2>
      <form>
        <div>
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contactNo">Contact No *</label>
          <input
            type="text"
            id="contactNo"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="emailAddress">Email Address *</label>
          <input
            type="email"
            id="emailAddress"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
          />
        </div>
        <button onClick={selectedTeacher ? handleEditTeacher : handleAddTeacher}>
          {selectedTeacher ? 'Update Teacher' : 'Add Teacher'}
        </button>
        <button onClick={resetForm}>Clear</button>
      </form>
      <h2>Teachers</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact No</th>
            <th>Email Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.teacherId}>
              <td>{teacher.firstName}</td>
              <td>{teacher.lastName}</td>
              <td>{teacher.contactNo}</td>
              <td>{teacher.emailAddress}</td>
              <td>
                <button onClick={() => selectTeacher(teacher)}>Edit</button>
                <button onClick={() => handleDeleteTeacher(teacher.teacherId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherForm;
