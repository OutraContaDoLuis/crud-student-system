import { useState, useRef } from "react"
import { updateStudent } from "../../requestApi"

function ModalUpdateStudent({ idStudent, functionToGetAllStudents }) {
    const[modalUpdateStudentState, setModalUpdateStudentState] = useState({
        invalidNameInForm: '',
        invalidEmailInForm: '',
        invalidPhoneNumberInForm: '',
        isLoadingUpdateStudent: false,
        errorToUpdateStudent: false,
        successToUpdateStudent: false,
    })
    const nameNewStudent = useRef('')
    const emailNewStudent = useRef('')
    const phoneNumberNewStudent = useRef('')

    const handlerCloseModal = () => {
        functionToGetAllStudents()
        handlerSetErrorToUpdateStudent(false)
        handlerSetSuccessToUpdateStudent(false)
    }

    const handlerUpdateStudent = async () => {
        handlerSetIsLoadingUpdateStudent(true)
        handlerSetErrorToUpdateStudent(false)
        handlerSetSuccessToUpdateStudent(false)

        try {
            await updateStudent(idStudent, {
                name: nameNewStudent.current,
                email: emailNewStudent.current,
                phone_number: phoneNumberNewStudent.current
            })
        } catch (e) {
            handlerSetErrorToUpdateStudent(true)
        } finally {
            handlerSetIsLoadingUpdateStudent(false)

            if (modalUpdateStudentState.errorToUpdateStudent == false) {
                handlerSetSuccessToUpdateStudent(true)
            }
        }
    }

    const handlerSetIsLoadingUpdateStudent = (value) => {
        setModalUpdateStudentState(prev => {
            return {
                ...prev,
                isLoadingUpdateStudent: value,
            }
        })
    }

    const handlerSetErrorToUpdateStudent = (value) => {
        setModalUpdateStudentState(prev => {
            return {
                ...prev,
                errorToUpdateStudent: value,
            }
        })
    }

    const handlerSetSuccessToUpdateStudent = (value) => {
        setModalUpdateStudentState(prev => {
            return {
                ...prev,
                successToUpdateStudent: value,
            }
        })
    }

    const handlerSetInvalidNameInForm = (value) => {
        setModalUpdateStudentState(prev => {
            return {
                ...prev,
                invalidNameInForm: value,
            }
        })
    }

    const handlerSetInvalidEmailInForm = (value) => {
        setModalUpdateStudentState(prev => {
            return {
                ...prev,
                invalidEmailInForm: value,
            }
        })
    }

    const handlerSetInvalidPhoneNumberInForm = (value) => {
        setModalUpdateStudentState(prev => {
            return {
                ...prev,
                invalidPhoneNumberInForm: value,
            }
        })
    }

    const handlerSetNameNewStudent = (event) => {
        nameNewStudent.current = event.target.value
    }

    const handlerSetEmailNewStudent = (event) => {
        emailNewStudent.current = event.target.value
    }

    const handlerSetPhoneNumberNewStudent = (event) => {
        phoneNumberNewStudent.current = event.target.value
    }


    return (
        <>
            <div class="modal fade" id="updateStudent" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5">Atualizar estudante</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={ handlerCloseModal }></button>
                        </div>
                        <div class="modal-body">
                            <div class="w-100 d-flex justify-content-start">
                                <label htmlFor="">Nome do estudante</label>
                            </div>                                
                            <div class="input-group mb-1 w-100">                                    
                                <input type="text" class="form-control w-100" placeholder="Nome do estudante" aria-label="Nome do estudante" aria-describedby="basic-addon1" onChange={ handlerSetNameNewStudent } required={ true }/>
                            </div>
                            {
                                modalUpdateStudentState.invalidNameInForm != '' ? 
                                <div class="w-100 d-flex justify-content-start">
                                    <p class="text-danger py-0 my-0"> { modalUpdateStudentState.invalidNameInForm } </p>
                                </div>   
                                :
                                <></>
                            }
                            <div class="mb-3"></div>
                            <div class="w-100 d-flex justify-content-start">
                                <label htmlFor="">Email</label>
                            </div>
                            <div class="input-group mb-1 w-100">                                    
                                <input type="text" class="form-control w-100" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" onChange={ handlerSetEmailNewStudent } required={ true }/>
                            </div>
                            {
                                modalUpdateStudentState.invalidEmailInForm != '' ? 
                                <div class="w-100 d-flex justify-content-start">
                                    <p class="text-danger py-0 my-0"> { modalUpdateStudentState.invalidEmailInForm } </p>
                                </div>   
                                :
                                <></>
                            }
                            <div class="mb-3"></div>
                            <div class="w-100 d-flex justify-content-start">
                                <label htmlFor="">Número telefone</label>
                            </div>
                            <div class="input-group mb-1 w-100">                                    
                                <input type="text" class="form-control w-100" placeholder="Numero telefone" aria-label="Numero telefone" aria-describedby="basic-addon1" onChange={ handlerSetPhoneNumberNewStudent } />
                            </div>
                            {
                                modalUpdateStudentState.invalidPhoneNumberInForm != '' ? 
                                <div class="w-100 d-flex justify-content-start">
                                    <p class="text-danger py-0 my-0"> { modalUpdateStudentState.invalidPhoneNumberInForm } </p>
                                </div>   
                                :
                                <></>
                            }
                            <div class="mb-3"></div>
                            <button type="button" class="btn btn-primary" disabled={ modalUpdateStudentState.isLoadingUpdateStudent } onClick={ handlerUpdateStudent }>
                                Atualizar
                            </button>
                        </div>
                        {
                            modalUpdateStudentState.errorToUpdateStudent ?
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
                            modalUpdateStudentState.successToUpdateStudent ?
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

export default ModalUpdateStudent