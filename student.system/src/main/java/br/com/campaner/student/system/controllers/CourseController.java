package br.com.campaner.student.system.controllers;

import br.com.campaner.student.system.dto.CourseDTO;
import br.com.campaner.student.system.models.Course;
import br.com.campaner.student.system.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {

    @Autowired
    CourseService courseService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<Course> courses = courseService.findAll();

        return ResponseEntity.ok(courses);
    }

    @GetMapping(
        value = "/{id}",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getById(@PathVariable(name = "id") Long id) {
        Course course = courseService.findById(id);

        return ResponseEntity.ok(course);
    }

    @PostMapping
    public ResponseEntity<?> post(@RequestBody CourseDTO body) {
        Course course = courseService.create(body);

        return ResponseEntity.status(201).body(course);
    }

    @PutMapping(
        value = "/{id}"
    )
    public ResponseEntity<?> put(@PathVariable(name = "id") Long id, @RequestBody CourseDTO body) {
        Course course = courseService.update(id, body);

        return ResponseEntity.status(200).body(course);
    }

    @DeleteMapping(
        value = "/{id}"
    )
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        courseService.delete(id);

        return ResponseEntity.noContent().build();
    }
}
