using AssignmentPK.Models;
using Microsoft.EntityFrameworkCore;

namespace AssignmentPK.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
        }

        public DbSet<Students> Students { get; set; }
        public DbSet<Teachers> Teachers { get; set; }
        public DbSet<Classrooms> Classrooms { get; set; }
        public DbSet<Subjects> Subjects { get; set; }
        public DbSet<AllocateSubjects> AllocateSubjects { get; set; }
        public DbSet<AllocateClassrooms> AllocateClassrooms { get; set; }
        public DbSet<StudentDetailReport> StudentDetailReports { get; set; }





        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure entity relationships and constraints here

            // Example configuration for Student entity
            modelBuilder.Entity<Students>()
                .HasKey(s => s.StudentId);

            modelBuilder.Entity<Students>()
                .Property(s => s.FirstName)
                .IsRequired();

            // Configure other entities and their relationships

            base.OnModelCreating(modelBuilder);
        }
    }
}
