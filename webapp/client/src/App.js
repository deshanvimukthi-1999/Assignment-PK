import './App.css';
import AllocateClassroomForm from './components/AllocateClassroomForm';
import AllocateSubjectForm from './components/AllocateSubjectForm';
import ClassroomForm from './components/ClassroomForm';
import StudentDetailReport from './components/StudentDetailReport';
import StudentRegistrationForm from './components/StudentRegistrationForm';
import SubjectForm from './components/SubjectForm';
import TeacherForm from './components/TeacherForm';

function App() {
  return (
    <div className="App">
      <div className="component-container">
        <StudentRegistrationForm />
      </div>
      <div className="component-container">
        <ClassroomForm />
      </div>
      <div className="component-container">
        <TeacherForm />
      </div>
      <div className="component-container">
        <SubjectForm />
      </div>
      <div className="component-container">
        <AllocateSubjectForm />
      </div>
      <div className="component-container">
        <AllocateClassroomForm />
      </div>
      <div className="component-container">
        <StudentDetailReport />
      </div>
    </div>
  );
}

export default App;
