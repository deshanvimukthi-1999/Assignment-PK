using AssignmentPK.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AssignmentPK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassroomController : ControllerBase
    {
        private static List<Classrooms> classrooms = new List<Classrooms>();

        [HttpGet]
        [Route("Classrooms")]
        public ActionResult<IEnumerable<Classrooms>> Get()
        {
            return Ok(classrooms);
        }

        [HttpPost]
        [Route("Classrooms")]
        public ActionResult<Classrooms> Add(Classrooms classroom)
        {
            classroom.ClassroomId = classrooms.Count + 1;
            classrooms.Add(classroom);
            return Ok(classroom);
        }

        [HttpPut("{id}")]
        [Route("Classrooms")]
        public ActionResult<Classrooms> UpdateClassroom(int id, Classrooms classroom)
        {
            var existingClassroom = classrooms.Find(c => c.ClassroomId == id);
            if (existingClassroom == null)
            {
                return NotFound();
            }

            existingClassroom.ClassName = classroom.ClassName;
            return Ok(existingClassroom);
        }

        [HttpDelete("{id}")]
        [Route("Classrooms")]
        public ActionResult Delete(int id)
        {
            var existingClassroom = classrooms.Find(c => c.ClassroomId == id);
            if (existingClassroom == null)
            {
                return NotFound();
            }

            classrooms.Remove(existingClassroom);
            return Ok();
        }
    }
}
