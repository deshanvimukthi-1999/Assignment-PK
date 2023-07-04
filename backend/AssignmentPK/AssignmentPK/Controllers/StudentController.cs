using AssignmentPK.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace AssignmentPK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private static List<Students> students = new List<Students>();
        private static int studentId = 1;

        [HttpGet]
        [Route("student")]
        public ActionResult<IEnumerable<Students>> Get()
        {
            return Ok(students);
        }

        [HttpGet("{id}")]
        [Route("student/{id}")]
        public ActionResult<Students> GetStudentById(int id)
        {
            var student = students.FirstOrDefault(s => s.StudentId == id);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }

        [HttpPost]
        [Route("student")]
        public ActionResult<Students> Register(Students student)
        {
            student.StudentId = studentId++;
            students.Add(student);
            return CreatedAtAction(nameof(GetStudentById), new { id = student.StudentId }, student);
        }

        [HttpPut("{id}")]
        [Route("student/{id}")]
        public ActionResult<Students> UpdateStudent(int id, Students updatedStudent)
        {
            var student = students.FirstOrDefault(s => s.StudentId == id);
            if (student == null)
            {
                return NotFound();
            }

            student.FirstName = updatedStudent.FirstName;
            student.LastName = updatedStudent.LastName;
            student.Age = updatedStudent.Age;

            return Ok(student);
        }

        [HttpDelete("{id}")]
        [Route("student/{id}")]
        public ActionResult DeleteStudent(int id)
        {
            var student = students.FirstOrDefault(s => s.StudentId == id);
            if (student == null)
            {
                return NotFound();
            }

            students.Remove(student);
            return Ok();
        }
    }
}
