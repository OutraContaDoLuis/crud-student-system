import { useEffect, useState } from 'react'
import './App.css'

import StudentPage from './StudentPage'
import CoursePage from './CoursePage'

function App() {
  const [appState, setAppState] = useState({
    studentPage: false,
    search: ''
  })

  const handlerSetIfItsStudentPage = (value) => {
    setAppState(prev => {
      return {
        ...prev,
        studentPage: value
      }
    })
  }

  const handlerSetSearch = (value) => {
    setAppState(prev => {
      return {
        ...prev,
        search: value
      }
    })
  }

  const handlerChangeInputSearch = (event) => {
    handlerSetSearch(event.target.value)
  }

  return (
    <>
      <div class="bg-body-secondary px-5 py-4">
        <div class="w-100 h-100 bg-white px-3 py-3">
          <div class="input-group mb-3 w-100">
            <input type="text" class="form-control w-100" placeholder="Procurar" aria-label="Procurar" aria-describedby="basic-addon1" onChange={ handlerChangeInputSearch }/>
          </div>
          <div class="d-flex my-3">
            <button type="button" class="btn btn-primary me-2" onClick={ () => handlerSetIfItsStudentPage(true) }>Estudantes</button>
            <button type="button" class="btn btn-primary me-2" onClick={ () => handlerSetIfItsStudentPage(false) }>Cursos</button>
          </div>
          {
            appState.studentPage ?
            <StudentPage />
            :
            <CoursePage />
          }
        </div>        
      </div>
    </>
  )
}

export default App
