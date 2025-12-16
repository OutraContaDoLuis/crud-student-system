import { useState, useRef } from "react"
import { createStudent } from "../../requestApi"

function ModalRegisterStudent({ functionToGetAllStudents }) {
    const[modalRegisterStudent, setModalRegisterStudent] = useState({
        isLoadingRegisterNewStudent: false,
        errorToRegisterNewStudent: false,
        successToRegisterNewStudent: false,
        invalidNameInForm: '',
        invalidEmailInForm: '',
        invalidPhoneNumberInForm: ''
    })
    const nameNewStudent = useRef('')
    const emailNewStudent = useRef('')
    const phoneNumberNewStudent = useRef('')

    const handlerRegisterNewStudent = async () => {
        handlerSetIsLoadingRegisterNewStudent(true)
        handlerSetErrorToRegisterNewStudent(false)
        handlerSetSuccessToRegisterNewStudent(false)
        handlerSetInvalidNameInForm('')
        handlerSetInvalidEmailInForm('')
        handlerSetInvalidPhoneNumberInForm('')

        let errorInForm = false

        if (nameNewStudent.current.length == 0) {
            handlerSetInvalidNameInForm('Você precisa inserir um nome!')
            errorInForm = true
        }

        if (emailNewStudent.current.length == 0) {
            handlerSetInvalidEmailInForm('Você precisa inserir um email!')
            errorInForm = true
        }

        if (phoneNumberNewStudent.current.length == 0) {
            handlerSetInvalidPhoneNumberInForm('Você precisa inserir um numero de telefone!')
            errorInForm = true
        }

        if (errorInForm) {
            handlerSetIsLoadingRegisterNewStudent(false)
            return
        }

        try {
            await createStudent({
                name: nameNewStudent.current,
                email: emailNewStudent.current,
                phone_number: phoneNumberNewStudent.current
            })
        } catch (e) {
            handlerSetErrorToRegisterNewStudent(true)
        } finally {
            handlerSetIsLoadingRegisterNewStudent(false)

            if (modalRegisterStudent.errorToRegisterNewStudent == false) {
                handlerSetSuccessToRegisterNewStudent(true)
            }
        }
    }

    const handlerSetIsLoadingRegisterNewStudent = (value) => {
        setModalRegisterStudent(prev => {
            return {
                ...prev,
                isLoadingRegisterNewStudent: value,
            }
        })
    }

    const handlerSetErrorToRegisterNewStudent = (value) => {
        setModalRegisterStudent(prev => {
            return {
                ...prev,
                errorToRegisterNewStudent: value,
            }
        })
    }

    const handlerSetSuccessToRegisterNewStudent = (value) => {
        setModalRegisterStudent(prev => {
            return {
                ...prev,
                successToRegisterNewStudent: value,
            }
        })
    }

    const handlerSetInvalidNameInForm = (value) => {
        setModalRegisterStudent(prev => {
            return {
                ...prev,
                invalidNameInForm: value,
            }
        })
    }

    const handlerSetInvalidEmailInForm = (value) => {
        setModalRegisterStudent(prev => {
            return {
                ...prev,
                invalidEmailInForm: value,
            }
        })
    }

    const handlerSetInvalidPhoneNumberInForm = (value) => {
        setModalRegisterStudent(prev => {
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
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Cadastrar novo estudante</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={ () => functionToGetAllStudents() }></button>
                        </div>
                        <div class="modal-body">
                            <div class="w-100 d-flex justify-content-start">
                                <label htmlFor="">Nome do estudante</label>
                            </div>                                
                            <div class="input-group mb-1 w-100">                                    
                                <input type="text" class="form-control w-100" placeholder="Nome do estudante" aria-label="Nome do estudante" aria-describedby="basic-addon1" onChange={ handlerSetNameNewStudent } required={ true }/>
                            </div>
                            {
                                modalRegisterStudent.invalidNameInForm != '' ? 
                                <div class="w-100 d-flex justify-content-start">
                                    <p class="text-danger py-0 my-0"> { modalRegisterStudent.invalidNameInForm } </p>
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
                                modalRegisterStudent.invalidEmailInForm != '' ? 
                                <div class="w-100 d-flex justify-content-start">
                                    <p class="text-danger py-0 my-0"> { modalRegisterStudent.invalidEmailInForm } </p>
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
                                modalRegisterStudent.invalidPhoneNumberInForm != '' ? 
                                <div class="w-100 d-flex justify-content-start">
                                    <p class="text-danger py-0 my-0"> { modalRegisterStudent.invalidPhoneNumberInForm } </p>
                                </div>   
                                :
                                <></>
                            }
                            <div class="mb-3"></div>
                            <button type="button" class="btn btn-primary" disabled={ modalRegisterStudent.isLoadingRegisterNewStudent } onClick={ handlerRegisterNewStudent }>
                                Cadastrar
                            </button>                    
                        </div>
                        {
                            modalRegisterStudent.errorToRegisterNewStudent ?
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
                            modalRegisterStudent.successToRegisterNewStudent ?
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

export default ModalRegisterStudent