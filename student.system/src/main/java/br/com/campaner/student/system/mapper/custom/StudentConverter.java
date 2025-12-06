package br.com.campaner.student.system.mapper.custom;

import br.com.campaner.student.system.dto.StudentDTO;
import br.com.campaner.student.system.models.Student;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class StudentConverter {

    public Student convertDTOToEntity(StudentDTO dto) {
        Student entity = new Student();
        entity.setName(dto.getName());
        entity.setEmail(dto.getEmail());
        entity.setPhoneNumber(dto.getPhoneNumber());
        entity.setDateRegister(new Date());

        return entity;
    }

    public StudentDTO convertEntityToDTO(Student entity) {
        StudentDTO dto = new StudentDTO();
        dto.setName(dto.getName());
        dto.setEmail(dto.getEmail());
        dto.setPhoneNumber(dto.getPhoneNumber());

        return dto;
    }

}
