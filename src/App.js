import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const jsonLoggedInUser = window.localStorage.getItem('loggedInUser')
    //add logout
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

  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)


  //refactor forms separate
  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
          username 
          <input
            type='text'
            name='Username'
            alt='poopie'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          passsword 
          <input
            type='text'
            name='Password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
        />
        <button type="submit">save</button>
      </form>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      
      {user === null ?
        loginForm() :
        <div>
          <p>{user.username} logged-in</p>
          {noteForm()}
        </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
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