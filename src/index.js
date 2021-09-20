import React from 'react-dom'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h2>TLDR Notes App</h2>
    </div>
  )
}

const Notes = () => {
  return (
    <div>
      <h2>Notes</h2>
    </div>
  )
}

const Users = () => {
  return (
    <div>
      <h2>Users</h2>
    </div>
  )
}

const App = () => {
  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to='/'>home</Link>
        <Link style={padding} to='/notes'>notes</Link>
        <Link style={padding} to='/users'>users</Link>
      </div>
      <Switch>
        <Route path='/notes'>
          <Notes />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          {/** slash-root path the last one cuz otherwise switch loop terminates on it */}
          <Home />
        </Route>
      </Switch>

      <div>
        <i>Note App Property of me</i>
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))