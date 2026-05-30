import './Register.css'

const Register = () => {
  return (
    <div className='register-kontener'>
      <form className='register-form'>
        <label htmlFor="name" id='name'>Név:</label> <br />
        <input type="text" id='reg-name' /> <br />
        <label htmlFor="email" id='email'>E-mail:</label> <br />
        <input type="text" id='reg-email' /><br />
        <label htmlFor="password" id='password'>Jelszo:</label> <br />
        <input type="text" id='reg-password' />
      </form>
      <button id='reg-gomb'>Regisztráció</button>
    </div>
  )
}

export default Register
