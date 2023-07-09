import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllocateSubjects = () => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    fetchTeachers();
    fetchSubjects();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('/api/AllocateSubjects/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('/api/AllocateSubjects/subjects');
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleAllocateSubject = async () => {
    if (!selectedTeacher || !selectedSubject) {
      console.error('Please select a teacher and subject.');
      return;
    }

    const allocateSubject = {
      teacherId: selectedTeacher.teacherId,
      subjectId: selectedSubject.subjectId,
    };

    try {
      const response = await axios.post('/api/AllocateSubjects', allocateSubject);
      console.log('Allocated subject:', response.data);
    } catch (error) {
      console.error('Error allocating subject:', error);
    }
  };

  return (
    <div>
      <h2>Allocate Subjects</h2>
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
        <label htmlFor="subject">Subject:</label>
        <select
          id="subject"
          value={selectedSubject ? selectedSubject.subjectId : ''}
          onChange={(e) => {
            const subjectId = parseInt(e.target.value);
            const subject = subjects.find((s) => s.subjectId === subjectId);
            setSelectedSubject(subject);
          }}
          required
        >
          <option value="">Select a subject</option>
          {subjects.map((subject) => (
            <option key={subject.subjectId} value={subject.subjectId}>
              {subject.subjectName}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAllocateSubject}>Allocate Subject</button>
    </div>
  );
};

export default AllocateSubjects;