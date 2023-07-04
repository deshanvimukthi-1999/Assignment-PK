import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllocateSubjectForm = () => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [allocatedSubjects, setAllocatedSubjects] = useState([]);

  useEffect(() => {
    // Fetch the teachers and subjects data from the server
    fetchTeachers();
    fetchSubjects();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('/api/AllocateSubject/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('/api/AllocateSubject/subjects');
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleAllocateSubject = async () => {
    if (selectedTeacher && selectedSubject) {
      const allocateSubject = {
        teacherId: parseInt(selectedTeacher),
        subjectId: parseInt(selectedSubject),
      };

      try {
        const response = await axios.post('/api/AllocateSubject', allocateSubject);

        if (response.status === 200) {
          setAllocatedSubjects([...allocatedSubjects, allocateSubject]);
          setSelectedTeacher('');
          setSelectedSubject('');
        } else {
          console.error('Failed to allocate subject:', response.statusText);
        }
      } catch (error) {
        console.error('Error allocating subject:', error);
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
        <label htmlFor="subject">Subject *</label>
        <select
          id="subject"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
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
      <h3>Allocated Subjects:</h3>
      <table>
        <thead>
          <tr>
            <th>Teacher</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {allocatedSubjects.map((allocatedSubject, index) => (
            <tr key={index}>
              <td>{allocatedSubject.teacherId}</td>
              <td>{allocatedSubject.subjectId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllocateSubjectForm;
