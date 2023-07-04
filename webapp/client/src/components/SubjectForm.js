import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubjectForm = () => {
  const [subjects, setSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('/api/Subject');
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();

    if (!subjectName) {
      console.error('Please enter a subject name.');
      return;
    }

    const subject = {
      subjectName,
    };

    try {
      const response = await axios.post('/api/Subject', subject);

      if (response.status === 201) {
        const data = response.data;
        setSubjects([...subjects, data]);
        setSubjectName('');
      } else {
        console.error('Failed to add subject:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding subject:', error);
    }
  };

  const handleEditSubject = async (e) => {
    e.preventDefault();

    if (!subjectName) {
      console.error('Please enter a subject name.');
      return;
    }

    const updatedSubject = {
      ...selectedSubject,
      subjectName,
    };

    try {
      const response = await axios.put(
        `/api/Subject/${selectedSubject.subjectId}`,
        updatedSubject
      );

      if (response.status === 200) {
        const data = response.data;
        const updatedSubjects = subjects.map((s) =>
          s.subjectId === data.subjectId ? data : s
        );
        setSubjects(updatedSubjects);
        setSubjectName('');
        setSelectedSubject(null);
      } else {
        console.error('Failed to update subject:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };

  const handleDeleteSubject = async (subjectId) => {
    try {
      const response = await axios.delete(`/api/Subject/${subjectId}`);

      if (response.status === 200) {
        const updatedSubjects = subjects.filter((s) => s.subjectId !== subjectId);
        setSubjects(updatedSubjects);
      } else {
        console.error('Failed to delete subject:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };

  const selectSubject = (subject) => {
    setSelectedSubject(subject);
    setSubjectName(subject.subjectName);
  };

  return (
    <div>
      <h2>Add/Edit Subject</h2>
      <form>
        <div>
          <label htmlFor="subjectName">Subject Name *</label>
          <input
            type="text"
            id="subjectName"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
          />
        </div>
        <button onClick={selectedSubject ? handleEditSubject : handleAddSubject}>
          {selectedSubject ? 'Update Subject' : 'Add Subject'}
        </button>
        <button onClick={() => setSelectedSubject(null)}>Clear</button>
      </form>
      <h2>Subjects</h2>
      <table>
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.subjectId}>
              <td>{subject.subjectName}</td>
              <td>
                <button onClick={() => selectSubject(subject)}>Edit</button>
                <button onClick={() => handleDeleteSubject(subject.subjectId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectForm;
