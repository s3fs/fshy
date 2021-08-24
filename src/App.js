import React, { useState, useEffect } from 'react'
import LoginForm from './components/login'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const jsonLoggedInUser = window.localStorage.getItem('loggedInUser')
    if (jsonLoggedInUser) {
      const user = JSON.parse(jsonLoggedInUser)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }

    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
    .update(id, changedNote)
      .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })    
  }

  const handleLogin = async (ev) => {
    ev.preventDefault()

    try {
      const res = await axios.post('/api/login', { username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(res.data))
      setUser(res.data)
      noteService.setToken(res.data.token)
      setUsername('')
      setPassword('')
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
    noteService.setToken(null)
  }

  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)

  const noteForm = () => (
    <div>
      <button onClick={handleLogout}>logout</button>
      <form onSubmit={addNote}>
          <input
            value={newNote}
            onChange={({ target }) => setNewNote(target.value)}
          />
          <button type="submit">save</button>
      </form>
    </div>
  )

  const loginForm = () => {
    const hideIfVisible = { display: loginVisible ? 'none' : '' }
    const showIfVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideIfVisible}>
          <button onClick={() => setLoginVisible(true)}>Log in</button>
        </div>
        <div style={showIfVisible}>
          <LoginForm 
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>Cancel login</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      
      {user === null ?
        <div>{loginForm()}</div> :
        <div>
          <p>{user.username} logged-in</p>
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