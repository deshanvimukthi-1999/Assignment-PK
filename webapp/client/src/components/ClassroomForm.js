import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClassroomForm = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [classroomName, setClassroomName] = useState('');
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    try {
      const response = await axios.get('/api/Classrooms');
      setClassrooms(response.data);
    } catch (error) {
      console.error('Error fetching classrooms:', error);
    }
  };

  const handleAddClassroom = async (e) => {
    e.preventDefault();

    if (!classroomName) {
      console.error('Please enter a classroom name.');
      return;
    }

    const classroom = {
      classroomName,
    };

    try {
      const response = await axios.post('/api/Classrooms', classroom);

      if (response.status === 200) {
        const data = response.data;
        setClassrooms([...classrooms, data]);
        setClassroomName('');
      } else {
        console.error('Failed to add classroom:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding classroom:', error);
    }
  };

  const handleEditClassroom = async (e) => {
    e.preventDefault();

    if (!classroomName) {
      console.error('Please enter a classroom name.');
      return;
    }

    const updatedClassroom = {
      ...selectedClassroom,
      classroomName,
    };

    try {
      const response = await axios.put(`/api/Classrooms/${selectedClassroom.classroomId}`, updatedClassroom);

      if (response.status === 200) {
        const data = response.data;
        const updatedClassrooms = classrooms.map((c) =>
          c.classroomId === data.classroomId ? data : c
        );
        setClassrooms(updatedClassrooms);
        setClassroomName('');
        setSelectedClassroom(null);
      } else {
        console.error('Failed to update classroom:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating classroom:', error);
    }
  };

  const handleDeleteClassroom = async (classroomId) => {
    try {
      const response = await axios.delete(`/api/Classrooms/${classroomId}`);

      if (response.status === 200) {
        const updatedClassrooms = classrooms.filter((c) => c.classroomId !== classroomId);
        setClassrooms(updatedClassrooms);
      } else {
        console.error('Failed to delete classroom:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting classroom:', error);
    }
  };

  const selectClassroom = (classroom) => {
    setSelectedClassroom(classroom);
    setClassroomName(classroom.classroomName);
  };

  return (
    <div>
      <h2>Add/Edit Classroom</h2>
      <form>
        <div>
          <label htmlFor="classroomName">Classroom Name *</label>
          <input
            type="text"
            id="classroomName"
            value={classroomName}
            onChange={(e) => setClassroomName(e.target.value)}
            required
          />
        </div>
        <button onClick={selectedClassroom ? handleEditClassroom : handleAddClassroom}>
          {selectedClassroom ? 'Update Classroom' : 'Add Classroom'}
        </button>
        <button onClick={() => setSelectedClassroom(null)}>Clear</button>
      </form>
      <h2>Classrooms</h2>
      <table>
        <thead>
          <tr>
            <th>Classroom Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classrooms.map((classroom) => (
            <tr key={classroom.classroomId}>
              <td>{classroom.classroomName}</td>
              <td>
                <button onClick={() => selectClassroom(classroom)}>Edit</button>
                <button onClick={() => handleDeleteClassroom(classroom.classroomId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassroomForm;
