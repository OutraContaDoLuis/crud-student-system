import { useEffect, useRef, useState } from "react"
import { createCourse, getAllCourses } from "./requestApi"
import ModalRegisterCourse from "./components/modals/ModalRegisterCourse"
import ModalDeleteCourse from "./components/modals/ModalDeleteCourse"
import ModalUpdateCourse from "./components/modals/ModalUpdateCourse"

function CoursePage({ search }) {
    const[coursePageState, setCoursePageState] = useState({
        courses: [],
        isLoading: false,
        errorToGetCourses: false,
        currentIdCourse: -1,
    })

    useEffect(() => {
        handlerGetAllCourses()
    }, [])

    const handlerGetAllCourses = async () => {
        handlerSetErrorToGetCourses(false)
        handlerSetIsLoading(true)

        try {            
            let data = await getAllCourses()
            handlerSetCourses(data)
        } catch (e) {
            handlerSetErrorToGetCourses(true)
        } finally {
            handlerSetIsLoading(false)
        }
    }

    const handlerSetCourses = (value) => {
        setCoursePageState(prev => {
            return {
                ...prev,
                courses: value
            }
        })
    }

    const handlerSetIsLoading = (value) => {
        setCoursePageState(prev => {
            return {
                ...prev,
                isLoading: value
            }
        })
    }

    const handlerSetErrorToGetCourses = (value) => {
        setCoursePageState(prev => {
            return {
                ...prev,
                errorToGetCourses: value
            }
        })
    }

    const handlerSetCurrentIdCourse = (value) => {
        setCoursePageState(prev => {
            return {
                ...prev,
                currentIdCourse: value
            }
        })
    }

    return(
        <>
            <div class="w-100">
                <button type="button" class="btn btn-success mb-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <i class="bi bi-plus-lg me-2"></i>
                    Cadastrar novo curso
                </button>
                <ModalRegisterCourse functionToGetAllCourses={ handlerGetAllCourses } />
                <div>
                    {
                        coursePageState.isLoading ?
                        <>  
                            <div class="text-center">
                                <p class="fs-4">Carregando...</p>
                            </div>                            
                        </>
                        :
                        <>
                            {
                                coursePageState.errorToGetCourses ?
                                <>
                                    <div class="text-center">
                                        <p class="fs-4 text-danger fw-medium mb-0 pb-0">Erro ao encontrar os cursos!</p>
                                        <p class="fs-4 text-danger fw-medium">Tente novamente mais tarde!</p>
                                        <button class="btn btn-primary" onClick={ handlerGetAllCourses }>Tentar novamente</button>
                                    </div>                                    
                                </>
                                :                                
                                coursePageState.courses.map((value, index) => (
                                    <div class="d-flex justify-content-between align-center w-100 mb-3">
                                        <div class="d-flex">
                                            <p> { value.name } </p>
                                        </div>
                                        <div class="d-flex">
                                            <button class="btn btn-danger me-2" data-bs-toggle="modal" data-bs-target="#sureAboutDeleteCourse" onClick={ () => handlerSetCurrentIdCourse(value.id) }>
                                                <i class="bi bi-x-lg"></i>
                                            </button>
                                            <button class="btn btn-warning me-2" data-bs-toggle="modal" data-bs-target="#updateCourse" onClick={ () => handlerSetCurrentIdCourse(value.id) }>
                                                <i class="bi bi-pencil-fill text-light"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                    }
                </div>
                <ModalDeleteCourse idCourse={ coursePageState.currentIdCourse } functionToGetAllCourses={ handlerGetAllCourses } />
                <ModalUpdateCourse idCourse={ coursePageState.currentIdCourse } functionToGetAllCourses={ handlerGetAllCourses } />
            </div>
        </>
    )
}

export default CoursePage