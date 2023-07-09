using AssignmentPK.Data;
using AssignmentPK.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace AssignmentPK.Controllers  
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        private readonly MyDbContext _dbContext;

        public SubjectController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/Subject
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subjects>>> GetSubjects()
        {
            return await _dbContext.Subjects.ToListAsync();
        }

        // GET: api/Subject/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Subjects>> GetSubject(int id)
        {
            var subject = await _dbContext.Subjects.FindAsync(id);

            if (subject == null)
            {
                return NotFound();
            }

            return subject;
        }

        // POST: api/Subject
        [HttpPost]
        public async Task<ActionResult<Subjects>> CreateSubject(Subjects subject)
        {
            _dbContext.Subjects.Add(subject);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSubject), new { id = subject.SubjectId }, subject);
        }

        // PUT: api/Subject/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSubject(int id, Subjects subject)
        {
            if (id != subject.SubjectId)
            {
                return BadRequest();
            }

            _dbContext.Entry(subject).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubjectExists(id))
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

        // DELETE: api/Subject/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubject(int id)
        {
            var subject = await _dbContext.Subjects.FindAsync(id);
            if (subject == null)
            {
                return NotFound();
            }

            _dbContext.Subjects.Remove(subject);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool SubjectExists(int id)
        {
            return _dbContext.Subjects.Any(s => s.SubjectId == id);
        }
    }
}
