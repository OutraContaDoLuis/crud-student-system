package br.com.campaner.student.system.services;

import br.com.campaner.student.system.dto.StudentDTO;
import br.com.campaner.student.system.mapper.custom.StudentConverter;
import br.com.campaner.student.system.models.Student;
import br.com.campaner.student.system.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    StudentConverter studentConverter;

    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    public Student findById(Long id) {
        return studentRepository.findById(id).orElseThrow();
    }

    public Student create(StudentDTO dto) {
        var entity = studentConverter.convertDTOToEntity(dto);

        studentRepository.save(entity);

        return entity;
    }

    public Student update(Long id, StudentDTO studentDTO) {
        Student entity = studentRepository.findById(id).orElseThrow();
        entity.setName(studentDTO.getName());
        entity.setEmail(studentDTO.getEmail());
        entity.setPhoneNumber(studentDTO.getPhoneNumber());

        studentRepository.save(entity);

        return entity;
    }

    public void delete(Long id) {
        studentRepository.deleteById(id);
    }

}
