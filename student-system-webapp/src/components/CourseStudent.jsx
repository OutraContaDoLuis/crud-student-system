import { useEffect, useState } from "react"
import { getCourseById } from "../requestApi"

function CourseStudent({ courseDb }) {
    const[courseStudentState, setCourseStudentState] = useState({
        course: {}
    })

    useEffect(() => {
        handlerGetTheCourse()
    }, [])

    const handlerGetTheCourse = async () => {
        try {
            let course = await getCourseById(courseDb.courseId)
            handlerSetCourse(course)
            console.log(course)
        } catch (e) {

        }
    }

    const handlerSetCourse = (value) => {
        setCourseStudentState(prev => {
            return {
                ...prev,
                course: value
            }
        })
    }

    return (
        <>
            <div>
                <div class="d-flex">
                    <p class="fs-5 fw-medium my-0 py-0 me-1"> Nome do curso: </p>
                    <p class="fs-5 my-0 py-0"> { courseStudentState.course.name } </p>
                </div>
                <div class="d-flex">
                    <p class="fs-5 fw-medium  my-0 py-0 me-1"> Duracao do curso: </p>
                    <p class="fs-5 my-0 py-0"> { courseStudentState.course.hours } horas </p>
                </div>
            </div>
        </>
    )
}

export default CourseStudent