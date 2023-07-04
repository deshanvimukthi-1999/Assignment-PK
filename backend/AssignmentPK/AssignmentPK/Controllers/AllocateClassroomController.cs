using AssignmentPK.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph.Models;
using System.Collections.Generic;

namespace AssignmentPK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AllocateClassroomController : ControllerBase
    {
        private static List<AllocateClassrooms> allocations = new List<AllocateClassrooms>();
        private static int allocationId = 1;

        [HttpGet]
        [Route("teachers")]
        public ActionResult<IEnumerable<Teachers>> GetTeachers()
        {
           
            var teachers = new List<Teachers>
            {
                new Teachers { TeacherId = 1, FirstName = "John" },
                new Teachers { TeacherId = 2, FirstName = "Jane" },
              
            };

            return Ok(teachers);
        }

        [HttpGet]
        [Route("classrooms")]
        public ActionResult<IEnumerable<Classrooms>> GetClassrooms()
        {
           
            var classrooms = new List<Classrooms>
            {
                new Classrooms { ClassroomId = 1, ClassName = "Class A" },
                new Classrooms { ClassroomId = 2, ClassName = "Class B" },
                
            };

            return Ok(classrooms);
        }

        [HttpPost]
        public ActionResult<AllocateClassrooms> AllocateClassroom(AllocateClassrooms allocation)
        {
            allocation.AllocateClassroomId = allocationId++;
            allocations.Add(allocation);
            return Ok(allocation);
        }
    }
}
