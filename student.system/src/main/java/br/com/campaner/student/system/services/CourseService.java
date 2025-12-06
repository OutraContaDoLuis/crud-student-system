package br.com.campaner.student.system.services;

import br.com.campaner.student.system.dto.CourseDTO;
import br.com.campaner.student.system.mapper.custom.CourseConvert;
import br.com.campaner.student.system.models.Course;
import br.com.campaner.student.system.models.Student;
import br.com.campaner.student.system.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    CourseConvert courseConvert;

    public List<Course> findAll() { return courseRepository.findAll(); }

    public Course findById(Long id) { return courseRepository.findById(id).orElseThrow(); }

    public Course create(CourseDTO dto) {
        var entity = courseConvert.convertDTOToEntity(dto);

        courseRepository.save(entity);

        return entity;
    }

    public Course update(Long id, CourseDTO dto) {
        Course entity = courseRepository.findById(id).orElseThrow();
        entity.setName(dto.getName());
        entity.setHours(dto.getHours());

        courseRepository.save(entity);

        return entity;
    }

    public void delete(Long id) {
        courseRepository.deleteById(id);
    }
}
