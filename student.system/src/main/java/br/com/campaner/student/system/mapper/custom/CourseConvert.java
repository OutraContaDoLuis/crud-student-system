package br.com.campaner.student.system.mapper.custom;

import br.com.campaner.student.system.dto.CourseDTO;
import br.com.campaner.student.system.models.Course;
import org.springframework.stereotype.Service;


@Service
public class CourseConvert {

    public Course convertDTOToEntity(CourseDTO dto) {
        Course entity = new Course();
        entity.setName(dto.getName());
        entity.setHours(dto.getHours());

        return entity;
    }

    public CourseDTO convertEntityToDTO(Course entity) {
        CourseDTO dto = new CourseDTO();
        dto.setName(dto.getName());
        dto.setHours(dto.getHours());

        return dto;
    }

}
