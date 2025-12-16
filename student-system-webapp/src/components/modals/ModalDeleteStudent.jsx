import { useState } from "react"
import { deleteStudent } from "../../requestApi"

function ModalDeleteStudent({ idStudent, functionToGetAllStudents }) {
    const[modalDeleteStudentState, setModalDeleteStudentState] = useState({
        loadingToDeleteStudent: false,
        errorToDeleteStudent: false,
        successToDeleteStudent: false
    })

    const handlerCloseModal = () => {
        functionToGetAllStudents()
        handlerSetErrorToDeleteStudent(false)
        handlerSetSuccessToDeleteStudent(false)
    }

    const handlerDeleteStudent = async () => {
        handlerSetLoadingToDeleteStudent(true)
        handlerSetErrorToDeleteStudent(false)
        handlerSetSuccessToDeleteStudent(false)

        try {
            await deleteStudent(idStudent)
        } catch (e) {
            handlerSetErrorToDeleteStudent(true)
        } finally {
            handlerSetLoadingToDeleteStudent(false)

            if (modalDeleteStudentState.errorToDeleteStudent == false) {
                console.log('Deletou o estudante com sucesso!')
                handlerSetSuccessToDeleteStudent(true)
            }
        }
    }

    const handlerSetLoadingToDeleteStudent = (value) => {
        setModalDeleteStudentState(prev => {
            return {
                ...prev,
                loadingToDeleteStudent: value
            }
        })
    }

    const handlerSetErrorToDeleteStudent = (value) => {
        setModalDeleteStudentState(prev => {
            return {
                ...prev,
                errorToDeleteStudent: value
            }
        })
    }
    
    const handlerSetSuccessToDeleteStudent = (value) => {
        setModalDeleteStudentState(prev => {
            return {
                ...prev,
                successToDeleteStudent: value
            }
        })
    }  

    return (
        <>
            <div class="modal fade" id="sureAboutDeleteStudent" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={ handlerCloseModal }></button>
                        </div>
                        <div class="modal-body">
                            <div class="text-center">
                                <p class="fs-4">Tem certeza que deseja deletar esse estudante?</p>
                                <button class="btn btn-success" onClick={ handlerDeleteStudent } disabled={ modalDeleteStudentState.loadingToDeleteStudent }>Sim</button>
                            </div>
                        </div>
                        {
                            modalDeleteStudentState.errorToDeleteStudent ?
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
                            modalDeleteStudentState.successToDeleteStudent ?
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

export default ModalDeleteStudent