package br.com.campaner.student.system.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "course")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false, length = 80)
    private String name;

    @Column(name = "hours", nullable = false)
    private Integer hours;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Integer getHours() {
        return hours;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setHours(Integer hours) {
        this.hours = hours;
    }
}
