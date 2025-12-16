package br.com.campaner.student.system.controllers;

import br.com.campaner.student.system.dto.CourseStudentDTO;
import br.com.campaner.student.system.models.CourseStudent;
import br.com.campaner.student.system.services.CourseStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/course_student")
@RestController
public class CourseStudentController {

    @Autowired
    CourseStudentService courseStudentService;

    @GetMapping(
        value = "/student_id/{id}"
    )
    public ResponseEntity<?> getAllCoursesStudentByStudentId(@PathVariable(name = "id") Long id) {
        List<CourseStudent> courseStudents = courseStudentService.getAllCoursesStudentByStudentId(id);

        return ResponseEntity.ok(courseStudents);
    }

    @PostMapping(
        value = "/insert_courses",
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> postCoursesStudent(@RequestBody List<CourseStudentDTO> body) {

        for (CourseStudentDTO dto : body) {
            courseStudentService.create(dto);
        }

        return ResponseEntity.status(201).build();
    }

    @DeleteMapping(
        value = "/unlink_course/{id}"
    )
    public ResponseEntity<?> unlinkCourse(@PathVariable(name = "id") Long id) {
        courseStudentService.deleteCourseOfTheStudent(id);

        return ResponseEntity.noContent().build();
    }
}
