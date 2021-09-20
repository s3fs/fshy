import { useState } from 'react'
import React from 'react-dom'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect, useParams, useHistory
} from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h2>TLDR Notes App</h2>
      <p>Jvik kadsom ndiowmqo mkboigfmj. 
        Pijfdmvko dmio a ondiosnm anewuifd. 
        Mduew kczozok. 
        Ifivdmkoi mniekosd mqo w.
      </p>
    </div>
  )
}

const Note = ({ notes }) => {
  const id = useParams().id //https://reactrouter.com/web/api/Hooks/useparams
  const note = notes.find(n => n.id === Number(id))

  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Notes = ({ notes }) => {
  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map(n =>
          <li key={n.id}>
            <Link to={`/notes/${n.id}`}>{n.content}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

const Users = () => {
  return (
    <div>
      <h2>Users</h2>
      <ul>
        <li>Matti Luukkainen</li>
        <li>Juha Tauriainen</li>
        <li>Arto Hellas</li>
      </ul>
    </div>
  )
}

const Login = (props) => {
  //access history object -> (modify url)
  const history = useHistory() //https://reacttraining.com/react-router/web/api/Hooks/usehistory

  const onSubmit = (ev) => {
    ev.preventDefault()
    props.onLogin('hakim')
    history.push('/') //changes the url to /
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <input />
        </div>
        <div>
          password: <input type='password' />
        </div>
        <button type='submit'>Log in</button>
      </form>
    </div>
  )
}

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only Javascript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const [user, setUser] = useState(null)

  const login = (user) => setUser(user)

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to='/'>home</Link>
          <Link style={padding} to='/notes'>notes</Link>
          <Link style={padding} to='/users'>users</Link>
          {user
            ? <em>{user} logged in</em>
            : <Link style={padding} to='/login'>login</Link>
          }
        </div>
        <Switch>
          <Route path='/notes/:id'>
            <Note notes={notes} />
          </Route>
          <Route path='/notes'>
            <Notes notes={notes} />
          </Route>
          <Route path='/users'>
            {user ? <Users /> : <Redirect to='/login' />}
          </Route>
          <Route path='/login'>
            <Login onLogin={login} />
          </Route>
          <Route path='/'>
            {/** slash-root path the last one cuz otherwise switch loop terminates on it */}
            <Home />
          </Route>
        </Switch>
      </Router>
      <div>
        <br />
        <i>Note App Property of me</i>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))