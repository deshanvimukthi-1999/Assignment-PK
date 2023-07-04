using AssignmentPK.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;


namespace AssignmentPK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private static List<Teachers> teachers = new List<Teachers>();
        private static int teacherId = 1;

        [HttpGet]
        [Route("teacher")]
        public ActionResult<IEnumerable<Teachers>> Get()
        {
            return Ok(teachers);
        }

        [HttpPost]
        [Route("teacher")]
        public ActionResult<Teachers> AddTeacher(Teachers teacher)
        {
            teacher.TeacherId = teacherId++;
            teachers.Add(teacher);
            return CreatedAtAction(nameof(GetTeacher), new { id = teacher.TeacherId }, teacher);
        }

        [HttpGet("{id}")]
        [Route("teacher")]
        public ActionResult<Teachers> GetTeacher(int id)
        {
            var teacher = teachers.Find(t => t.TeacherId == id);
            if (teacher == null)
                return NotFound();

            return Ok(teacher);
        }

        [HttpPut("{id}")]
        [Route("teacher")]
        public ActionResult<Teachers> UpdateTeacher(int id, Teachers teacher)
        {
            var existingTeacher = teachers.Find(t => t.TeacherId == id);
            if (existingTeacher == null)
                return NotFound();

            existingTeacher.FirstName = teacher.FirstName;
            existingTeacher.LastName = teacher.LastName;
            existingTeacher.ContactNo = teacher.ContactNo;
            existingTeacher.EmailAddress = teacher.EmailAddress;

            return Ok(existingTeacher);
        }

        [HttpDelete("{id}")]
        [Route("teacher")]

        public ActionResult DeleteTeacher(int id)
        {
            var teacher = teachers.Find(t => t.TeacherId == id);
            if (teacher == null)
                return NotFound();

            teachers.Remove(teacher);
            return Ok();
        }
    }
}
