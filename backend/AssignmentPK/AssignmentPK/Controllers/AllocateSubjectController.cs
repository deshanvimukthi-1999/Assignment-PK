using AssignmentPK.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph.Models;
using System.Collections.Generic;

namespace AssignmentPK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AllocateSubjectController : ControllerBase
    {
        private static List<AllocateSubjects> allocatesubjects = new List<AllocateSubjects>();
        private static int allocatesubjectId = 1;

        [HttpGet]
        [Route("teachers")]
        public ActionResult<IEnumerable<Teachers>> GetTeachers()
        {
            
            var teachers = new List<Teachers>
            {
                new Teachers { TeacherId = 1, FirstName = "John" },
                new Teachers { TeacherId = 2, FirstName= "Jane" },
                
            };

            return Ok(teachers);
        }

        [HttpGet]
        [Route("subjects")]
        public ActionResult<IEnumerable<Subjects>> GetSubjects()
        {
           
            var subjects = new List<Subjects>
            {
                new Subjects { SubjectId = 1, SubjectName = "Mathematics" },
                new Subjects { SubjectId = 2, SubjectName = "Science" },
           
            };

            return Ok(subjects);
        }

        [HttpPost]
        public ActionResult<AllocateSubjects> AllocateSubject(AllocateSubjects allocatesubject)
        {
            allocatesubject.AllocateSubjectId  = allocatesubjectId++;
            allocatesubjects.Add(allocatesubject);
            return Ok(allocatesubject);
        }
    }
}
