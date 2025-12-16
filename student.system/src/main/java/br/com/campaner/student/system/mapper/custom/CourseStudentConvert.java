package br.com.campaner.student.system.mapper.custom;

import br.com.campaner.student.system.dto.CourseStudentDTO;
import br.com.campaner.student.system.models.CourseStudent;
import org.springframework.stereotype.Service;

@Service
public class CourseStudentConvert {

    public CourseStudent convertDTOToEntity(CourseStudentDTO dto) {
        CourseStudent entity = new CourseStudent();
        entity.setCourseId(dto.getCourseId());
        entity.setStudentId(dto.getStudentId());

        return entity;
    }

    public CourseStudentDTO convertEntityToDTO(CourseStudent entity) {
        CourseStudentDTO dto = new CourseStudentDTO();
        dto.setCourseId(entity.getCourseId());
        dto.setStudentId(entity.getStudentId());

        return dto;
    }

}
