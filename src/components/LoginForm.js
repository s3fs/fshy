import React, { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (ev) => {
    ev.preventDefault()

    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

    return (
        <form onSubmit={login}>
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
            type='password'
            name='Password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    )
}

export default LoginForm