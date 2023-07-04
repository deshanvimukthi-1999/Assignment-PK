import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllocateClassroomForm = () => {
  const [teachers, setTeachers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [allocatedClassrooms, setAllocatedClassrooms] = useState([]);

  useEffect(() => {
    // Fetch the teachers and classrooms data from the server
    fetchTeachers();
    fetchClassrooms();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('/api/AllocateClassroom/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const fetchClassrooms = async () => {
    try {
      const response = await axios.get('/api/AllocateClassroom/classrooms');
      setClassrooms(response.data);
    } catch (error) {
      console.error('Error fetching classrooms:', error);
    }
  };

  const handleAllocateClassroom = async () => {
    if (selectedTeacher && selectedClassroom) {
      const allocateClassroom = {
        teacherId: parseInt(selectedTeacher),
        classroomId: parseInt(selectedClassroom),
      };

      try {
        const response = await axios.post('/api/AllocateClassroom', allocateClassroom);

        if (response.status === 200) {
          setAllocatedClassrooms([...allocatedClassrooms, allocateClassroom]);
          setSelectedTeacher('');
          setSelectedClassroom('');
        } else {
          console.error('Failed to allocate classroom:', response.statusText);
        }
      } catch (error) {
        console.error('Error allocating classroom:', error);
      }
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="teacher">Teacher *</label>
        <select
          id="teacher"
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          required
        >
          <option value="">Select a teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher.teacherId} value={teacher.teacherId}>
              {teacher.teacherName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="classroom">Classroom *</label>
        <select
          id="classroom"
          value={selectedClassroom}
          onChange={(e) => setSelectedClassroom(e.target.value)}
          required
        >
          <option value="">Select a classroom</option>
          {classrooms.map((classroom) => (
            <option key={classroom.classroomId} value={classroom.classroomId}>
              {classroom.classroomName}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAllocateClassroom}>Allocate Classroom</button>
      <h3>Allocated Classrooms:</h3>
      <table>
        <thead>
          <tr>
            <th>Teacher</th>
            <th>Classroom</th>
          </tr>
        </thead>
        <tbody>
          {allocatedClassrooms.map((allocatedClassroom, index) => (
            <tr key={index}>
              <td>{allocatedClassroom.teacherId}</td>
              <td>{allocatedClassroom.classroomId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllocateClassroomForm;
