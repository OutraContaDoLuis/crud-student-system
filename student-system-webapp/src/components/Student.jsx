import { useEffect, useState } from "react";
import { getCoursesOfStudent, deleteCourseStudentById } from "../requestApi";
import CourseStudent from "./CourseStudent";
import ModalAddCourseToStudent from "./modals/ModalAddCourseToStudent";

function Student({ student, index }) {
    const[studentState, setStudentState] = useState({
        isLoading: false,
        errorToGetCourses: false,
        courses: []
    })

    useEffect(() => {
        handlerGetCourses()
    }, [])

    const handlerGetCourses = async () => {
        handlerSetIsLoading(true)
        handlerSetErrorToGetCourses(false)

        try {
            let courses = await getCoursesOfStudent(student.id)
            handlerSetCourses(courses)
        } catch (e) {
            handlerSetErrorToGetCourses(true)
        } finally {
            handlerSetIsLoading(false)
        }
    }

    const handlerDisacioteCourse = async (courseStudentId) => {


        try {
            await deleteCourseStudentById(courseStudentId)
        } catch (e) {
        } finally {
            handlerGetCourses()
        }
    }

    const handlerSetIsLoading = (value) => {
        setStudentState(prev => {
            return {
                ...prev,
                isLoading: value
            }
        })
    }

    const handlerSetErrorToGetCourses = (value) => {
        setStudentState(prev => {
            return {
                ...prev,
                errorToGetCourses: value
            }
        })
    }

    const handlerSetCourses = (value) => {
        setStudentState(prev => {
            return {
                ...prev,
                courses: value
            }
        })
    }

    return (
        <>
            <div class="collapse" id={ `collapse${index}` }>
                <div class="w-100 py-3">
                    <button class="btn btn-success mb-2" data-bs-toggle="modal" data-bs-target={ `#addCourseToStudent${index}` }>
                        <i class="bi bi-plus-lg me-2"></i>
                        Adicionar novo curso
                    </button>
                    <ModalAddCourseToStudent index={ index } />
                    {
                        studentState.isLoading == false ?
                        <>
                            {
                                studentState.errorToGetCourses ? 
                                <>
                                    <div class="text-center">
                                        <p class="fs-4">Ocorreu um erro ao encontrar os cursos desse estudante!</p>
                                    </div>    
                                </>
                                :
                                <>
                                    {
                                        studentState.courses.length != 0 && studentState.courses != undefined ?
                                        studentState.courses.map((course, indexCourse) => (
                                            <>
                                                <div class="d-flex justify-content-between align-items-center w-100 mb-3">
                                                    <div class="d-flex align-items-center">
                                                        <CourseStudent courseDb={ course } />
                                                    </div>
                                                    <div class="d-flex h-100">
                                                        <button class="btn btn-danger me-2" onClick={ () => handlerDisacioteCourse(course.id) }>
                                                            <i class="bi bi-x-lg fs-5"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        ))
                                        :
                                        <>
                                            <div class="text-center">
                                                <p class="fs-4">Nenhum curso desse estudante foi encontrado!</p>
                                            </div>  
                                        </>
                                    }
                                </>                                
                            }
                        </>                        
                        :
                        <>
                            <div class="text-center">
                                <p class="fs-4">Carregando...</p>
                            </div>    
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Student