import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubjectForm = () => {
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState({
    subjectName: '',
  });

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

  const handleInputChange = (e) => {
    setSubject({
      ...subject,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/Subject', subject);

      if (response.status === 201) {
        const newSubject = response.data;
        setSubjects([...subjects, newSubject]);
        setSubject({
          subjectName: '',
        });
      } else {
        console.error('Failed to create subject:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating subject:', error);
    }
  };

  return (
    <div>
      <h2>Subject Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subjectName">Subject Name:</label>
          <input
            type="text"
            id="subjectName"
            name="subjectName"
            value={subject.subjectName}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Create Subject</button>
      </form>
    </div>
  );
};

export default SubjectForm;
