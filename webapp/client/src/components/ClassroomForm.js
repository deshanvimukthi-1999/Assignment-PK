import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClassroomForm = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [classroom, setClassroom] = useState({
    classroomName: '',
  });

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    try {
      const response = await axios.get('/api/Classroom');
      setClassrooms(response.data);
    } catch (error) {
      console.error('Error fetching classrooms:', error);
    }
  };

  const handleInputChange = (e) => {
    setClassroom({
      ...classroom,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/Classroom', classroom);

      if (response.status === 201) {
        const newClassroom = response.data;
        setClassrooms([...classrooms, newClassroom]);
        setClassroom({
          classroomName: '',
        });
      } else {
        console.error('Failed to create classroom:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating classroom:', error);
    }
  };

  return (
    <div>
      <h2>Classroom Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="classroomName">Classroom Name:</label>
          <input
            type="text"
            id="classroomName"
            name="classroomName"
            value={classroom.classroomName}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Create Classroom</button>
      </form>
    </div>
  );
};

export default ClassroomForm;
