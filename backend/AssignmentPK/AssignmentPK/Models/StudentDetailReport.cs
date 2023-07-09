namespace AssignmentPK.Models
{
    public class StudentDetailReport
    {
        public int Id { get; set; }
        public string ContactPerson { get; set; }
        public string ContactNo { get; set; }
        public string Email { get; set; }
        public string DateOfBirth { get; set; }
        public string Classroom { get; set; }
        public List<SubjectTeacher> SubjectTeacherList { get; set; }
    }

    public class SubjectTeacher
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public string Teacher { get; set; }
    }
}
