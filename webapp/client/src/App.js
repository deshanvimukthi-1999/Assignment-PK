import './App.css';
import ClassroomForm from './components/ClassroomForm';
import SubjectForm from './components/SubjectForm';
import TeacherForm from './components/TeacherForm';
import AllocateSubjectForm from './components/AllocateSubjectForm';
import AllocateClassroomForm from './components/AllocateClassroomForm';
import StudentDetailReport from './components/StudentDetailReport';
import StudentRegistrationForm from './components/StudentRegistrationForm';

function App() {
  return (
    <div className="App">
      <div className="component-container">
        <ClassroomForm />
      </div>
      <div className="component-container">
        <SubjectForm />
      </div>
      <div className="component-container">
        <StudentRegistrationForm />
      </div>
      <div className="component-container">
        <TeacherForm />
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
