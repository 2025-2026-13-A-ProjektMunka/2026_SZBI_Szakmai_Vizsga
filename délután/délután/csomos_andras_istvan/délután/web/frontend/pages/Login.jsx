import './Login.css'

const Login = () => {
  return (
    <div className='login-kontener'>
      <form className='login-form'>
        <label htmlFor="email" id='email'>E-mail:</label> <br />
        <input type="text" id='log-email' /><br />
        <label htmlFor="password" id='password'>Jelszo:</label> <br />
        <input type="text" id='log-password' />
      </form>
      <button id='log-gomb'>Bejelentkezés</button>
    </div>
  )
}

export default Login
