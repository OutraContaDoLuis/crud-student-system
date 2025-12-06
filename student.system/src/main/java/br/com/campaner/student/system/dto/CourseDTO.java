package br.com.campaner.student.system.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.io.Serializable;

@JsonPropertyOrder({ "name", "hours" })
public class CourseDTO implements Serializable {

    @JsonProperty("name")
    private String name;

    @JsonProperty("hours")
    private Integer hours;

    public String getName() {
        return name;
    }

    public Integer getHours() {
        return hours;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setHours(Integer hours) {
        this.hours = hours;
    }
}
