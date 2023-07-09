using AssignmentPK.Data;
using AssignmentPK.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace AssignmentPK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly MyDbContext _dbContext;

        public TeacherController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/Teacher
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Teachers>>> GetTeachers()
        {
            return await _dbContext.Teachers.ToListAsync();
        }

        // GET: api/Teacher/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Teachers>> GetTeacher(int id)
        {
            var teacher = await _dbContext.Teachers.FindAsync(id);

            if (teacher == null)
            {
                return NotFound();
            }

            return teacher;
        }

        // POST: api/Teacher
        [HttpPost]
        public async Task<ActionResult<Teachers>> CreateTeacher(Teachers teacher)
        {
            _dbContext.Teachers.Add(teacher);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTeacher), new { id = teacher.TeacherId }, teacher);
        }

        // PUT: api/Teacher/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeacher(int id, Teachers teacher)
        {
            if (id != teacher.TeacherId)
            {
                return BadRequest();
            }

            _dbContext.Entry(teacher).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeacherExists(id))
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

        // DELETE: api/Teacher/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeacher(int id)
        {
            var teacher = await _dbContext.Teachers.FindAsync(id);
            if (teacher == null)
            {
                return NotFound();
            }

            _dbContext.Teachers.Remove(teacher);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool TeacherExists(int id)
        {
            return _dbContext.Teachers.Any(t => t.TeacherId == id);
        }
    }
}
