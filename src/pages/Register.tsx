import '../styles/Login.css'

import React from 'react'

interface FormElements extends HTMLFormControlsCollection {
  firstName: HTMLInputElement
  lastName: HTMLInputElement
  email: HTMLInputElement
  password: HTMLInputElement
  confirmPassword: HTMLInputElement
}

interface LoginFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

function Register() {
  async function handleSubmit(
    e: React.FormEvent<LoginFormElement>
  ): Promise<void> {
    e.preventDefault()
    const firstName: string = e.currentTarget.elements.firstName.value
    const lastName: string = e.currentTarget.elements.lastName.value
    const email: string = e.currentTarget.elements.email.value
    const password: string = e.currentTarget.elements.password.value
    const confirmPassword: string =
      e.currentTarget.elements.confirmPassword.value
    const response = await fetch('http://127.0.0.1:3000/api/v1/auth/register', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }),
    })

    return console.log(response.status)
  }

  return (
    <div className='app-login'>
      <h1>odinbook</h1>
      <form
        action=''
        method=''
        className='login-form'
        onSubmit={(e: React.FormEvent<LoginFormElement>) => handleSubmit(e)}
      >
        <div className='login-input'>
          <label htmlFor='firstName'>First name</label>
          <input type='text' name='firstName' required />
        </div>
        <div className='login-input'>
          <label htmlFor='lastName'>Last name</label>
          <input type='text' name='lastName' required />
        </div>
        <div className='login-input'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' required />
        </div>
        <div className='login-input'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' required minLength={6} />
        </div>
        <div className='login-input'>
          <label htmlFor='confirmPassword'>Confirm password</label>
          <input
            type='password'
            name='confirmPassword'
            required
            minLength={6}
          />
        </div>
        <button>Register</button>
        <div className='app-line'></div>
      </form>

      <div className='register-account'>
        <p>{`Already have an account?`}</p>
        <a href='/login'>Login</a>
      </div>
    </div>
  )
}

export default Register
