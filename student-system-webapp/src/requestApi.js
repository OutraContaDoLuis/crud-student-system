import axios from "axios"

const baseUrl = 'http://localhost:8080'

async function getAllStudents() {
    let response = await axios.get(`${baseUrl}/student`)
        .catch(e => {
            console.log('Error to get all students.')
            throw new Error(`Error to get all the students! ${e}`)
        })

    return response.data
}

async function getStudentById(id) {
    return await axios.get(`${baseUrl}/student/${id}`)
}

async function createStudent(newStudent) {
    await axios.post(`${baseUrl}/student`, newStudent)
        .catch(e => {
            console.log('Error to register student.')
            throw new Error(`Error to register student! ${e}`)
        })
}

async function updateStudent(id, newStudent) {
    await axios.put(`${baseUrl}/student/${id}`, newStudent)
}

async function deleteStudent(id) {
    await axios.delete(`${baseUrl}/student/${id}`)
}

async function getAllCourses() {
    let response = await axios.get(`${baseUrl}/course`)
    return response.data
}

async function getCourseById(id) {
    let response = await axios.get(`${baseUrl}/course/${id}`)

    return response.data
}

async function createCourse(newStudent) {
    await axios.post(`${baseUrl}/course`, newStudent)
}

async function updateCourse(id, newStudent) {
    await axios.put(`${baseUrl}/course/${id}`, newStudent)
}

async function deleteCourse(id) {
    await axios.delete(`${baseUrl}/course/${id}`)
}

async function getCoursesOfStudent(studentId) {
    let response = await axios.get(`${baseUrl}/student/get_courses/${studentId}`)
        .catch((e) => {
            console.log('Error to get courses of student.')
            throw new Error(`Error to get courses of student! ${e}`)
        })

    return response.data
}

async function deleteCourseStudentById(courseStudentId) {
    await axios.delete(`${baseUrl}/course_student/unlink_course/${courseStudentId}`)
}

export { 
    getAllStudents, 
    getStudentById, 
    createStudent,
    updateStudent, 
    deleteStudent ,
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    getCoursesOfStudent,
    deleteCourseStudentById
}
