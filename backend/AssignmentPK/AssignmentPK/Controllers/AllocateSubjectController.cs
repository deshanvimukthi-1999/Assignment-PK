using AssignmentPK.Data;
using AssignmentPK.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace AssignmentPK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AllocateSubjectsController : ControllerBase
    {
        private readonly MyDbContext _dbContext;

        public AllocateSubjectsController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AllocateSubjects>>> GetAllocateSubjects()
        {
            var allocateSubjects = await _dbContext.AllocateSubjects.ToListAsync();
            return Ok(allocateSubjects);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AllocateSubjects>> GetAllocateSubject(int id)
        {
            var allocateSubject = await _dbContext.AllocateSubjects.FindAsync(id);

            if (allocateSubject == null)
            {
                return NotFound();
            }

            return allocateSubject;
        }

        [HttpPost]
        public async Task<ActionResult<AllocateSubjects>> CreateAllocateSubject(AllocateSubjects allocateSubject)
        {
            _dbContext.AllocateSubjects.Add(allocateSubject);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAllocateSubject), new { id = allocateSubject.AllocateSubjectId }, allocateSubject);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAllocateSubject(int id, AllocateSubjects allocateSubject)
        {
            if (id != allocateSubject.AllocateSubjectId)
            {
                return BadRequest();
            }

            _dbContext.Entry(allocateSubject).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AllocateSubjectExists(id))
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAllocateSubject(int id)
        {
            var allocateSubject = await _dbContext.AllocateSubjects.FindAsync(id);
            if (allocateSubject == null)
            {
                return NotFound();
            }

            _dbContext.AllocateSubjects.Remove(allocateSubject);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool AllocateSubjectExists(int id)
        {
            return _dbContext.AllocateSubjects.Any(a => a.AllocateSubjectId == id);
        }
    }
}
