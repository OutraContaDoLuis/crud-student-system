package br.com.campaner.student.system.controllers;

import br.com.campaner.student.system.dto.CourseStudentDTO;
import br.com.campaner.student.system.dto.StudentDTO;
import br.com.campaner.student.system.models.CourseStudent;
import br.com.campaner.student.system.models.Student;
import br.com.campaner.student.system.services.CourseStudentService;
import br.com.campaner.student.system.services.StudentService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.Media;
import java.util.ArrayList;
import java.util.List;

@RequestMapping("/student")
@RestController
public class StudentController {

    @Autowired
    StudentService studentService;

    @Autowired
    CourseStudentService courseStudentService;

    @GetMapping(
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getAll() {
        List<Student> students = studentService.findAll();

        return ResponseEntity.ok(students);
    }

    @GetMapping(
        value = "/{id}",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getById(@PathVariable(name = "id") Long id) {
        Student student = studentService.findById(id);

        return ResponseEntity.ok(student);
    }

    @PostMapping(
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> post(@RequestBody StudentDTO body) {
        var entity = studentService.create(body);

        return ResponseEntity.status(201).body(entity);
    }

    @PutMapping(
        value = "/{id}",
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> put(@PathVariable(name = "id") Long id, @RequestBody StudentDTO body) {
        var entity = studentService.update(id, body);

        return ResponseEntity.ok(entity);
    }

    @DeleteMapping(
        value = "/{id}"
    )
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        studentService.delete(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping(
        value = "/get_courses/{student_id}",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getHisCourses(@PathVariable(name = "student_id") Long id) {
        List<CourseStudent> courseStudents = courseStudentService.getAllCoursesStudentByStudentId(id);

        return ResponseEntity.ok(courseStudents);
    }

    @PostMapping(
        value = "/insert_courses",
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> postHisCourses(@RequestBody List<CourseStudentDTO> body) {

        for (CourseStudentDTO dto : body) {
            courseStudentService.create(dto);
        }

        return ResponseEntity.status(201).build();
    }

}
