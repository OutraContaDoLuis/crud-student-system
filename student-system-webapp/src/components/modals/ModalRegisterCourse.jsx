import { useState, useRef } from "react"
import { createCourse } from "../../requestApi"

function ModalRegisterCourse({ functionToGetAllCourses }) {
    const [modalRegisterCourseState, setModalRegisterCourseState] = useState({
        isLoadingRegisterNewCourse: false,
        errorToRegisterNewCourse: false,
        successToRegisterNewCourse: false,
        invalidNameInForm: '',
        invalidHoursInForm: '',
    })
    const nameNewCourse = useRef('')
    const hoursNewCourse = useRef('')

    const handlerRegisterNewCourse = async () => {
        handlerSetErrorToRegisterNewCourse(false)
        handlerSetIsLoadingRegisterNewCourse(true)
        handlerSetInvalidNameInForm('')
        handlerSetInvalidHoursInForm('')

        let errorInForm = false

        if (nameNewCourse.current.length == 0) {
            handlerSetInvalidNameInForm('É preciso inserir um nome para o curso!')
            errorInForm = true
        }

        if (hoursNewCourse.current.length == 0) {
            handlerSetInvalidHoursInForm('É preciso inserir um tempo para o curso!')
            errorInForm = true
        } else if (isNaN(parseInt(hoursNewCourse.current))) {
            handlerSetInvalidHoursInForm('É preciso inserir o tempo em números!')
            errorInForm = true
        }

        try {
            await createCourse({
                name: nameNewCourse.current,
                hours: parseInt(hoursNewCourse.current)
            })
        } catch (e) {
            handlerSetErrorToRegisterNewCourse(true)
        } finally {
            handlerSetIsLoadingRegisterNewCourse(false)
        }
    }

    const handlerSetIsLoadingRegisterNewCourse = (value) => {
        setModalRegisterCourseState(prev => {
            return {
                ...prev,
                isLoadingRegisterNewCourse: value
            }
        })
    }

    const handlerSetErrorToRegisterNewCourse = (value) => {
        setModalRegisterCourseState(prev => {
            return {
                ...prev,
                errorToRegisterNewCourse: value
            }
        })
    }

    const handlerSetInvalidNameInForm = (value) => {
        setModalRegisterCourseState(prev => {
            return {
                ...prev,
                invalidNameInForm: value
            }
        })
    }

    const handlerSetInvalidHoursInForm = (value) => {
        setModalRegisterCourseState(prev => {
            return {
                ...prev,
                invalidHoursInForm: value
            }
        })
    }

    const handlerSetNameNewCourse = (event) => {
        nameNewCourse.current = event.target.value
    }

    const handlerSetHoursNewCourse = (event) => {
        hoursNewCourse.current = event.target.value
    }

    return (
        <>
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Cadastrar novo curso</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={ () => functionToGetAllCourses() }></button>
                        </div>
                        <div class="modal-body">
                            <div class="w-100 d-flex justify-content-start">
                                <label htmlFor="">Nome do curso</label>
                            </div>
                            <div class="input-group mb-1 w-100">                                    
                                <input type="text" class="form-control w-100" placeholder="Nome do curso" aria-label="Nome do curso" aria-describedby="basic-addon1" onChange={ handlerSetNameNewCourse }/>
                            </div>
                            {
                                modalRegisterCourseState.invalidNameInForm != '' ? 
                                <div class="w-100 d-flex justify-content-start">
                                    <p class="text-danger py-0 my-0"> { modalRegisterCourseState.invalidNameInForm } </p>
                                </div>   
                                :
                                <></>
                            }
                            <div class="mb-3"></div>
                            <div class="w-100 d-flex justify-content-start">
                                <label htmlFor="">Duração do curso</label>
                            </div>
                            <div class="input-group mb-1 w-100">                                    
                                <input type="text" class="form-control w-100" placeholder="Tempo do curso em horas" aria-label="Tempo do curso em horas" aria-describedby="basic-addon1" onChange={ handlerSetHoursNewCourse }/>
                            </div>
                            {
                                modalRegisterCourseState.invalidHoursInForm != '' ? 
                                <div class="w-100 d-flex justify-content-start">
                                    <p class="text-danger py-0 my-0"> { modalRegisterCourseState.invalidHoursInForm } </p>
                                </div>   
                                :
                                <></>
                            }
                            <div class="mb-3"></div>
                            <button type="button" class="btn btn-primary" onClick={ handlerRegisterNewCourse } disabled={ modalRegisterCourseState.isLoadingRegisterNewCourse }>
                                Cadastrar
                            </button>
                        </div>       
                        {
                            modalRegisterCourseState.errorToRegisterNewCourse ?
                            <div class="alert alert-danger d-flex align-items-center mx-3" role="alert">
                                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                                <div>
                                    Erro! Tente novamente mais tarde!
                                </div>
                            </div>              
                            :
                            <></>
                        }                 
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalRegisterCourse