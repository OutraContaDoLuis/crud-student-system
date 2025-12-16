import { useEffect, useState } from "react"
import { getAllCourses } from "../../requestApi"

function ModalAddCourseToStudent({ index }) {
    const[state, setState] = useState({
        allCourses: []
    })

    useEffect(() => {
        handlerGetAllCourses()
    }, [])

    const handlerGetAllCourses = async () => {
        try {
            let courses = await getAllCourses()
            handlerSetAllCourses(courses)
        } catch (e) {

        }
    }

    const handlerSetAllCourses = (value) => {
        setState(prev => {
            return {
                ...prev, 
                allCourses: value
            }
        })
    }

    return (
        <>
            <div class="modal fade" id={ `addCourseToStudent${index}` } data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {
                                state.allCourses.length != 0 ?
                                <>
                                    {
                                        state.allCourses.map((course, index) => (
                                            <>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" value="" id="checkDefault" />
                                                    <label class="form-check-label" for="checkDefault">
                                                        { course.name }
                                                    </label>
                                                </div>
                                            </>
                                        ))
                                    }
                                </>
                                :
                                <>
                                    <p>Carregando...</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalAddCourseToStudent