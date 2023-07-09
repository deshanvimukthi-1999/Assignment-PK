using AssignmentPK.Data;
using AssignmentPK.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AssignmentPK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassroomController : ControllerBase
    {
        private readonly MyDbContext _dbContext;

        public ClassroomController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/Classroom
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Classrooms>>> GetClassrooms()
        {
            return await _dbContext.Classrooms.ToListAsync();
        }

        // GET: api/Classroom/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Classrooms>> GetClassroom(int id)
        {
            var classroom = await _dbContext.Classrooms.FindAsync(id);

            if (classroom == null)
            {
                return NotFound();
            }

            return classroom;
        }

        // POST: api/Classroom
        [HttpPost]
        public async Task<ActionResult<Classrooms>> CreateClassroom(Classrooms classroom)
        {
            _dbContext.Classrooms.Add(classroom);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClassroom), new { id = classroom.ClassroomId }, classroom);
        }

        // PUT: api/Classroom/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClassroom(int id, Classrooms classroom)
        {
            if (id != classroom.ClassroomId)
            {
                return BadRequest();
            }

            _dbContext.Entry(classroom).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassroomExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Classroom/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClassroom(int id)
        {
            var classroom = await _dbContext.Classrooms.FindAsync(id);
            if (classroom == null)
            {
                return NotFound();
            }

            _dbContext.Classrooms.Remove(classroom);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool ClassroomExists(int id)
        {
            return _dbContext.Classrooms.Any(c => c.ClassroomId == id);
        }
    }
}
