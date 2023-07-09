using AssignmentPK.Data;
using AssignmentPK.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AssignmentPK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AllocateClassroomsController : ControllerBase
    {
        private readonly MyDbContext _dbContext;

        public AllocateClassroomsController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AllocateClassrooms>>> GetAllocateClassrooms()
        {
            var allocateClassrooms = await _dbContext.AllocateClassrooms.ToListAsync();
            return Ok(allocateClassrooms);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AllocateClassrooms>> GetAllocateClassroom(int id)
        {
            var allocateClassroom = await _dbContext.AllocateClassrooms.FindAsync(id);

            if (allocateClassroom == null)
            {
                return NotFound();
            }

            return allocateClassroom;
        }

        [HttpPost]
        public async Task<ActionResult<AllocateClassrooms>> CreateAllocateClassroom(AllocateClassrooms allocateClassroom)
        {
            _dbContext.AllocateClassrooms.Add(allocateClassroom);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAllocateClassroom), new { id = allocateClassroom.AllocateClassroomId }, allocateClassroom);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAllocateClassroom(int id, AllocateClassrooms allocateClassroom)
        {
            if (id != allocateClassroom.AllocateClassroomId)
            {
                return BadRequest();
            }

            _dbContext.Entry(allocateClassroom).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AllocateClassroomExists(id))
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
        public async Task<IActionResult> DeleteAllocateClassroom(int id)
        {
            var allocateClassroom = await _dbContext.AllocateClassrooms.FindAsync(id);
            if (allocateClassroom == null)
            {
                return NotFound();
            }

            _dbContext.AllocateClassrooms.Remove(allocateClassroom);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool AllocateClassroomExists(int id)
        {
            return _dbContext.AllocateClassrooms.Any(a => a.AllocateClassroomId == id);
        }
    }
}
