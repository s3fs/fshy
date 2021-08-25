import React from 'react'

const LoginForm = ({
    handleSubmit,
    handlePasswordChange,
    handleUsernameChange,
    username,
    password
}) => {
    return (
        <form onSubmit={handleSubmit}>
        <div>
          username 
          <input
            type='text'
            name='Username'
            alt='poopie'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          passsword 
          <input
            type='password'
            name='Password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    )
}

export default LoginForm