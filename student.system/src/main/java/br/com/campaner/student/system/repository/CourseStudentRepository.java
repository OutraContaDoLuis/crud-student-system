package br.com.campaner.student.system.repository;

import br.com.campaner.student.system.models.CourseStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseStudentRepository extends JpaRepository<CourseStudent, Long> {

    @NativeQuery(value = "select * from course_student where student_id = ?1")
    public List<CourseStudent> getAllCourseStudentByStudentId(Long studentId);

}
