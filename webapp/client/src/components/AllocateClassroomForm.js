import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllocateClassrooms = () => {
  const [teachers, setTeachers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  useEffect(() => {
    fetchTeachers();
    fetchClassrooms();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('/api/AllocateClassrooms/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const fetchClassrooms = async () => {
    try {
      const response = await axios.get('/api/AllocateClassrooms/classrooms');
      setClassrooms(response.data);
    } catch (error) {
      console.error('Error fetching classrooms:', error);
    }
  };

  const handleAllocateClassroom = async () => {
    if (!selectedTeacher || !selectedClassroom) {
      console.error('Please select a teacher and classroom.');
      return;
    }

    const allocateClassroom = {
      teacherId: selectedTeacher.teacherId,
      classroomId: selectedClassroom.classroomId,
    };

    try {
      const response = await axios.post('/api/AllocateClassrooms', allocateClassroom);
      console.log('Allocated classroom:', response.data);
    } catch (error) {
      console.error('Error allocating classroom:', error);
    }
  };

  return (
    <div>
      <h2>Allocate Classrooms</h2>
      <div>
        <label htmlFor="teacher">Teacher:</label>
        <select
          id="teacher"
          value={selectedTeacher ? selectedTeacher.teacherId : ''}
          onChange={(e) => {
            const teacherId = parseInt(e.target.value);
            const teacher = teachers.find((t) => t.teacherId === teacherId);
            setSelectedTeacher(teacher);
          }}
          required
        >
          <option value="">Select a teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher.teacherId} value={teacher.teacherId}>
              {teacher.firstName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="classroom">Classroom:</label>
        <select
          id="classroom"
          value={selectedClassroom ? selectedClassroom.classroomId : ''}
          onChange={(e) => {
            const classroomId = parseInt(e.target.value);
            const classroom = classrooms.find((c) => c.classroomId === classroomId);
            setSelectedClassroom(classroom);
          }}
          required
        >
          <option value="">Select a classroom</option>
          {classrooms.map((classroom) => (
            <option key={classroom.classroomId} value={classroom.classroomId}>
              {classroom.className}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAllocateClassroom}>Allocate Classroom</button>
    </div>
  );
};

export default AllocateClassrooms;
