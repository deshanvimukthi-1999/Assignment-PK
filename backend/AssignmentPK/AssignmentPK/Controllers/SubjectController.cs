using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using AssignmentPK.Models;

namespace AssignmentPK.Controllers
{
    [Route("api/[controller]")]
    public class SubjectController : ControllerBase
    {
        private readonly List<Subjects> _subjects = new List<Subjects>();

        // GET: /api/Subject
        [HttpGet]
        [Route("subject")]
        public ActionResult<IEnumerable<Subjects>> GetSubjects()
        {
            return _subjects;
        }

        // POST: /api/Subject
        [HttpPost]
        [Route("subject")]
        public ActionResult<Subjects> AddSubject(Subjects subject)
        {
            subject.SubjectId = _subjects.Count + 1;
            _subjects.Add(subject);

            return CreatedAtAction(nameof(GetSubjectById), new { id = subject.SubjectId }, subject);
        }

        // PUT: /api/Subject/{id}
        [HttpPut("{id}")]
        [Route("subject")]
        public IActionResult UpdateSubject(int id, Subjects updatedSubject)
        {
            var subject = _subjects.FirstOrDefault(s => s.SubjectId == id);

            if (subject == null)
            {
                return NotFound();
            }

            subject.SubjectName = updatedSubject.SubjectName;

            return Ok(subject);
        }

        // DELETE: /api/Subject/{id}
        [HttpDelete("{id}")]
        [Route("subject")]
        public IActionResult DeleteSubject(int id)
        {
            var subject = _subjects.FirstOrDefault(s => s.SubjectId == id);

            if (subject == null)
            {
                return NotFound();
            }

            _subjects.Remove(subject);

            return Ok();
        }

        // GET: /api/Subject/{id}
        [HttpGet("{id}")]
        [Route("subject/{id}")]
        public ActionResult<Subjects> GetSubjectById(int id)
        {
            var subject = _subjects.FirstOrDefault(s => s.SubjectId == id);

            if (subject == null)
            {
                return NotFound();
            }

            return subject;
        }
    }
}
