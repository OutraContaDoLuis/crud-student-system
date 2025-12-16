import { useState, useRef } from "react"
import { updateCourse } from "../../requestApi"

function ModalUpdateCourse({ idCourse, functionToGetAllCourses }) {
    const[modalUpdateCourseState, setModalUpdateCourseState] = useState({
        invalidNameInForm: '',
        invalidHoursForm: '',
        isLoadingUpdateCourse: false,
        errorToUpdateCourse: false,
        successToUpdateCourse: false,
    })
    const nameCourse = useRef('')
    const hoursCourse = useRef('')

    const handlerCloseModal = () => {
        functionToGetAllCourses()
        handlerSetErrorToUpdateCourse(false)
        handlerSetSuccessToUpdateCourse(false)
    }

    const handlerUpdateCourse = async () => {
        handlerSetIsLoadingUpdateCourse(true)
        handlerSetErrorToUpdateCourse(false)
        handlerSetSuccessToUpdateCourse(false)

        try {
            await updateCourse(idCourse, {
                name: nameCourse.current,
                hours: hoursCourse.current
            })
        } catch (e) {
            handlerSetErrorToUpdateCourse(true)
        } finally {
            handlerSetIsLoadingUpdateCourse(false)

            if (modalUpdateCourseState.errorToUpdateCourse == false) {
                handlerSetSuccessToUpdateCourse(true)
            }
        }
    }

    const handlerSetIsLoadingUpdateCourse = (value) => {
        setModalUpdateCourseState(prev => {
            return {
                ...prev,
                isLoadingUpdateCourse: value,
            }
        })
    }

    const handlerSetErrorToUpdateCourse = (value) => {
        setModalUpdateCourseState(prev => {
            return {
                ...prev,
                errorToUpdateCourse: value,
            }
        })
    }

    const handlerSetSuccessToUpdateCourse = (value) => {
        setModalUpdateCourseState(prev => {
            return {
                ...prev,
                successToUpdateCourse: value,
            }
        })
    }

    const handlerSetInvalidNameInForm = (value) => {
        setModalUpdateCourseState(prev => {
            return {
                ...prev,
                invalidNameInForm: value,
            }
        })
    }

    const handlerSetInvalidEmailInForm = (value) => {
        setModalUpdateCourseState(prev => {
            return {
                ...prev,
                invalidHoursForm: value,
            }
        })
    }

    const handlerSetNameCourse = (event) => {
        nameCourse.current = event.target.value
    }

    const handlerSetHoursCourse = (event) => {
        hoursCourse.current = event.target.value
    }

    return (
        <>
            <div class="modal fade" id="updateCourse" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5">Atualizar estudante</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={ handlerCloseModal }></button>
                        </div>
                        <div class="modal-body">
                            <div class="w-100 d-flex justify-content-start">
                                <label htmlFor="">Nome do curso</label>
                            </div>                                
                            <div class="input-group mb-1 w-100">                                    
                                <input type="text" class="form-control w-100" placeholder="Nome do curso" aria-label="Nome do estudante" aria-describedby="basic-addon1" onChange={ handlerSetNameCourse } required={ true }/>
                            </div>
                            {
                                modalUpdateCourseState.invalidNameInForm != '' ? 
                                <div class="w-100 d-flex justify-content-start">
                                    <p class="text-danger py-0 my-0"> { modalUpdateCourseState.invalidNameInForm } </p>
                                </div>   
                                :
                                <></>
                            }
                            <div class="mb-3"></div>
                            <div class="w-100 d-flex justify-content-start">
                                <label htmlFor="">Horas do curso</label>
                            </div>
                            <div class="input-group mb-1 w-100">                                    
                                <input type="text" class="form-control w-100" placeholder="Horas do curso" aria-label="Email" aria-describedby="basic-addon1" onChange={ handlerSetHoursCourse } required={ true }/>
                            </div>
                            {
                                modalUpdateCourseState.invalidHoursForm != '' ? 
                                <div class="w-100 d-flex justify-content-start">
                                    <p class="text-danger py-0 my-0"> { modalUpdateCourseState.invalidHoursForm } </p>
                                </div>   
                                :
                                <></>
                            }
                            <div class="mb-3"></div>
                            <button type="button" class="btn btn-primary" disabled={ modalUpdateCourseState.isLoadingUpdateCourse } onClick={ handlerUpdateCourse }>
                                Atualizar
                            </button>
                        </div>
                        {
                            modalUpdateCourseState.errorToUpdateCourse ?
                            <div class="alert alert-danger d-flex align-items-center mx-3" role="alert">
                                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                                <div>
                                    Erro! Tente novamente mais tarde!
                                </div>
                            </div>              
                            :
                            <></>
                        }
                        {
                            modalUpdateCourseState.successToUpdateCourse ?
                            <div class="alert alert-success d-flex align-items-center mx-3" role="alert">
                                <i class="bi bi-check-circle me-2"></i>
                                <div>
                                    Sucesso ao registrar o novo estudante!
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

export default ModalUpdateCourse