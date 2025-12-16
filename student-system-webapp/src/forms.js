function validateFormRegisterNewStudent(name) {
    let studentName = student.name
    if (studentName.isEmpty()) {
        return false
    }
}

function validateFormRegisterNewCourse(course) {

}

function dateFormat(dateToFormat) {
    let allDateSplited = dateToFormat.split('T')
    let dateSplited = allDateSplited[0].split('-')

    return `${dateSplited[2]}/${dateSplited[1]}/${dateSplited[0]}`
}

export { dateFormat }