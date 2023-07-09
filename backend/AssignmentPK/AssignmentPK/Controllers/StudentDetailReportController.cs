using AssignmentPK.Data;
using AssignmentPK.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AssignmentPK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentDetailReportController : ControllerBase
    {
        private readonly MyDbContext _dbContext;

        public StudentDetailReportController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentDetailReport>>> GetStudentDetailReports()
        {
            var studentDetailReports = await _dbContext.StudentDetailReports.ToListAsync();
            return Ok(studentDetailReports);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StudentDetailReport>> GetStudentDetailReport(int id)
        {
            var studentDetailReport = await _dbContext.StudentDetailReports.FindAsync(id);

            if (studentDetailReport == null)
            {
                return NotFound();
            }

            return studentDetailReport;
        }

        [HttpPost]
        public async Task<ActionResult<StudentDetailReport>> CreateStudentDetailReport(StudentDetailReport studentDetailReport)
        {
            _dbContext.StudentDetailReports.Add(studentDetailReport);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStudentDetailReport), new { id = studentDetailReport.Id }, studentDetailReport);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudentDetailReport(int id, StudentDetailReport studentDetailReport)
        {
            if (id != studentDetailReport.Id)
            {
                return BadRequest();
            }

            _dbContext.Entry(studentDetailReport).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentDetailReportExists(id))
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
        public async Task<IActionResult> DeleteStudentDetailReport(int id)
        {
            var studentDetailReport = await _dbContext.StudentDetailReports.FindAsync(id);
            if (studentDetailReport == null)
            {
                return NotFound();
            }

            _dbContext.StudentDetailReports.Remove(studentDetailReport);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool StudentDetailReportExists(int id)
        {
            return _dbContext.StudentDetailReports.Any(s => s.Id == id);
        }
    }
}
