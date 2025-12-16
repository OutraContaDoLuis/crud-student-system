package br.com.campaner.student.system.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "student_id", "course_id" })
public class CourseStudentDTO {

    @JsonProperty("student_id")
    private Long studentId;

    @JsonProperty("course_id")
    private Long courseId;

    public Long getStudentId() {
        return studentId;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }
}
