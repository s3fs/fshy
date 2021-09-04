import React, { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (ev) => {
    ev.preventDefault()
    createNote({
      content: newNote,
      date: new Date().toISOString(),
      important: false
    })

    setNewNote('')
  }

  return (
    <div className='formWrapper'>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
        />
        <button type='submit'>Save note</button>
      </form>
    </div>
  )
}

export default NoteForm