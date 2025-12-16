package br.com.campaner.student.system.services;

import br.com.campaner.student.system.dto.CourseStudentDTO;
import br.com.campaner.student.system.mapper.custom.CourseStudentConvert;
import br.com.campaner.student.system.models.CourseStudent;
import br.com.campaner.student.system.repository.CourseStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseStudentService  {

    @Autowired
    CourseStudentRepository courseStudentRepository;

    @Autowired
    CourseStudentConvert courseStudentConvert;

    public CourseStudent create(CourseStudentDTO dto) {
        var entity = courseStudentConvert.convertDTOToEntity(dto);

        courseStudentRepository.save(entity);

        return entity;
    }

    public List<CourseStudent> getAllCoursesStudentByStudentId(Long id) {
        return courseStudentRepository.getAllCourseStudentByStudentId(id);
    }

    public void deleteCourseOfTheStudent(Long id) {
        courseStudentRepository.deleteById(id);
    }
}
