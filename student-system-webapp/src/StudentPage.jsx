import { useEffect, useState } from "react"
import { getAllStudents, getCoursesOfStudent } from "./requestApi"
import { dateFormat } from "./forms"
import ModalRegisterStudent from "./components/modals/ModalRegisterStudent"
import ModalDeleteStudent from "./components/modals/ModalDeleteStudent"
import ModalUpdateStudent from "./components/modals/ModalUpdateStudent"
import Student from "./components/Student"

function StudentPage({ search }) {
    const[studentPageState, setStudentPageState] = useState({
        students: [],
        isLoading: true,
        errorToGetStudents: false,
        currentIdStudentSelected: -1,
        coursesOfTheStudents: []
    })

    useEffect(() => {
        handlerGetAllStudents()
    }, [])

    const handlerGetAllStudents = async () => {
        handlerSetErrorToGetStudents(false)
        handlerSetIsLoading(true)

        try {   
            let students = await getAllStudents()
            handlerSetStudents(students)
        } catch (e) {
            handlerSetErrorToGetStudents(true)
        } finally {
            handlerSetIsLoading(false)
        }
    }

    const handlerGetAllCoursesOfTheStudent = async (idStudent) => {
        let coursesOfStudent = []
        
        try {
            coursesOfStudent = await getCoursesOfStudent(idStudent)
            console.log(idStudent)
            console.log(coursesOfStudent)
            handlerSetCoursesOfTheStudents(coursesOfStudent)
            console.log(studentPageState.coursesOfTheStudents)
        } catch (e) {
            console.log(e)
        }
    }

    const handlerSetStudents = (value) => {
        setStudentPageState(prev => {
            return {
                ...prev,
                students: value,
            }
        })
    }

    const handlerSetIsLoading = (value) => {
        setStudentPageState(prev => {
            return {
                ...prev,
                isLoading: value,
            }
        })
    }

    const handlerSetErrorToGetStudents = (value) => {
        setStudentPageState(prev => {
            return {
                ...prev,
                errorToGetStudents: value,
            }
        })
    }

    const handlerSetCurrentIdStudentSelected = (value) => {
        setStudentPageState(prev => {
            return {
                ...prev,
                currentIdStudentSelected: value,
            }
        })
    }

    const handlerSetCoursesOfTheStudents = (value) => {
        let newCoursesOfTheStudents = studentPageState.coursesOfTheStudents
        newCoursesOfTheStudents.push(value)

        setStudentPageState(prev => {
            return {
                ...prev,
                coursesOfTheStudents: newCoursesOfTheStudents,
            }
        })
    }
    
    return(
        <>
            <div>
                <div>
                    <button type="button" class="btn btn-success mb-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <i class="bi bi-plus-lg me-2"></i>
                        Cadastrar novo estudante
                    </button>
                </div>                
                <ModalRegisterStudent functionToGetAllStudents={ handlerGetAllStudents } />
                <div>
                    {
                        studentPageState.isLoading ?
                        <>
                            <div class="text-center">
                                <p class="fs-4">Carregando...</p>
                            </div>                            
                        </>
                        :
                        <>
                            {
                                studentPageState.errorToGetStudents ?
                                <>
                                    <div class="text-center">
                                        <p class="fs-4 text-danger fw-medium mb-0 pb-0">Erro ao encontrar os estudantes!</p>
                                        <p class="fs-4 text-danger fw-medium">Tente novamente mais tarde!</p>
                                        <button class="btn btn-primary" onClick={ handlerGetAllStudents }>Tentar novamente</button>
                                    </div>                                    
                                </>
                                :                                
                                studentPageState.students.map((value, index) => (
                                    <div class="px-3">
                                        <div class="d-flex justify-content-between align-items-center w-100 mb-3">
                                            <div class="d-flex align-items-center">
                                                <div class="d-flex h-100">   
                                                    <i class="bi bi-person-circle me-4 icon-student"></i>
                                                </div>
                                                <div class="h-100">
                                                    <p class="fs-5 fw-medium py-0 my-0"> { value.name } </p>
                                                    <p class="py-0 my-0"> Email: { value.email } </p>
                                                    <p class="py-0 my-0"> Telefone: { value.phoneNumber } </p>
                                                    <p class="py-0 my-0"> Data de registro: { dateFormat(value.dateRegister) } </p>
                                                </div>
                                                
                                            </div>
                                            <div class="d-flex h-100">
                                                <button class="btn btn-danger me-2" data-bs-toggle="modal" data-bs-target="#sureAboutDeleteStudent" onClick={ () => handlerSetCurrentIdStudentSelected(value.id) }>
                                                    <i class="bi bi-x-lg fs-5"></i>
                                                </button>
                                                <button class="btn btn-warning me-2" data-bs-toggle="modal" data-bs-target="#updateStudent" onClick={ () => handlerSetCurrentIdStudentSelected(value.id) }>
                                                    <i class="bi bi-pencil-fill text-light fs-5"></i>
                                                </button>
                                                <button class="btn btn-info text-light" data-bs-toggle="collapse" data-bs-target={ `#collapse${index}` } role="button" aria-expanded="false" aria-controls={ `#collapse${index}` } onClick={ () => handlerGetAllCoursesOfTheStudent(value.id) }>
                                                    Cursos
                                                </button>
                                            </div>
                                        </div>
                                        <Student student={ value } index={ index } />
                                        <hr />
                                    </div>                                    
                                ))
                            }
                        </>
                    }
                </div>
                <ModalDeleteStudent idStudent={ studentPageState.currentIdStudentSelected } functionToGetAllStudents={ handlerGetAllStudents } />
                <ModalUpdateStudent idStudent={ studentPageState.currentIdStudentSelected } functionToGetAllStudents={ handlerGetAllStudents } />
            </div>            
        </>
    )
}

export default StudentPage