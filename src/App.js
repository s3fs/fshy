import React, { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import { getAll, create, update, setToken } from './services/notes'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    (async () => {
      const res = await getAll()
      setNotes(res)
    })()
  }, [])

  useEffect(() => {
    const jsonLoggedInUser = window.localStorage.getItem('loggedInUser')
    if (jsonLoggedInUser) {
      const user = JSON.parse(jsonLoggedInUser)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const addNote = async (noteObject) => {
    const res = await create(noteObject)
    setNotes(notes.concat(res))
    noteFormRef.current.toggleVisibility()
  }

  const toggleImportanceOf = async (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    try {
      const res = await update(id, changedNote)
      setNotes(notes.map(note => note.id !== id ? note : res))
    } catch (err) {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (username, password) => {
    try {
      const res = await axios.post('/api/login', { username, password })
      console.log('res :>> ', res)
      window.localStorage.setItem('loggedInUser', JSON.stringify(res.data))
      setUser(res.data)
      setToken(res.data.token)
    } catch (err) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    setToken(null)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const noteFormRef = useRef()

  const noteForm = () => (
    <Togglable buttonLabel='New note' ref={noteFormRef}>
      <NoteForm
        createNote={addNote}
      />
    </Togglable>
  )

  const loginForm = () => (
    //refactor it the same way as noteform + ! warn msg note len !
    <Togglable buttonLabel='Log in'>
      <LoginForm
        handleLogin={handleLogin}
      />
    </Togglable>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null ?
        <div>{loginForm()}</div> :
        <div>
          <p>{user.username} logged-in <button onClick={handleLogout}>Log out</button></p>
          {noteForm()}
        </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important notes only' : 'all notes' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App