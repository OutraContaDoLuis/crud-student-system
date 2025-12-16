import { useState } from "react"
import { deleteCourse } from "../../requestApi"

function ModalDeleteCourse({ idCourse, functionToGetAllCourses }) {
    const[modalDeleteCourseState, setModalDeleteCourseState] = useState({
        loadingToDeleteCourse: false,
        errorToDeleteCourse: false,
        successToDeleteCourse: false
    })

    const handlerCloseModal = () => {
        functionToGetAllCourses()
    }

    const handlerDeleteCourse = async () => {
        handlerSetLoadingToDeleteCourse(true)
        handlerSetErrorToDeleteCourse(false)
        handlerSetSuccessToDeleteCourse(false)

        try {
            await deleteCourse(idCourse)
        } catch (e) {
            handlerSetErrorToDeleteCourse(true)
        } finally {
            handlerSetLoadingToDeleteCourse(false)

            if (modalDeleteCourseState.errorToDeleteCourse == false) {
                handlerSetSuccessToDeleteCourse(true)
            }
        }
    }

    const handlerSetLoadingToDeleteCourse = (value) => {
        setModalDeleteCourseState(prev => {
            return {
                ...prev,
                loadingToDeleteCourse: value
            }
        })
    }

    const handlerSetErrorToDeleteCourse = (value) => {
        setModalDeleteCourseState(prev => {
            return {
                ...prev,
                errorToDeleteCourse: value
            }
        })
    }
    
    const handlerSetSuccessToDeleteCourse = (value) => {
        setModalDeleteCourseState(prev => {
            return {
                ...prev,
                successToDeleteCourse: value
            }
        })
    }  
    
    return (
        <>
            <div class="modal fade" id="sureAboutDeleteCourse" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={ handlerCloseModal }></button>
                        </div>
                        <div class="modal-body">
                            <div class="text-center">
                                <p class="fs-4">Tem certeza que deseja deletar este curso?</p>
                                <button class="btn btn-success" onClick={ handlerDeleteCourse } disabled={ modalDeleteCourseState.loadingToDeleteCourse }>Sim</button>
                            </div>
                        </div>
                        {
                            modalDeleteCourseState.errorToDeleteCourse ?
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
                            modalDeleteCourseState.successToDeleteCourse ?
                            <div class="alert alert-success d-flex align-items-center mx-3" role="alert">
                                <i class="bi bi-check-circle me-2"></i>
                                <div>
                                    Sucesso!
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

export default ModalDeleteCourse