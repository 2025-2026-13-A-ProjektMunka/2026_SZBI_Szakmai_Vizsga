import { useState } from "react";
import './Login.css';

const Login = () => {

    const [email, setEmail] = useState('');
    const [jelszo, setJelszo] = useState('');

const belepes = async (e) => {
    e.preventDefault();

    if(!email || !jelszo) {
        window.alert('Minden mezőt ki kell tölteni!');
        return;
    }

const response = await fetch('http://localhost:3800/api/frontend/belepes', {
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({email, jelszo})
})

const valasz = await response.json();

if(!response.ok) {
    window.alert(valasz.msg);
    window.location.href = '/';
} else {
    window.alert(valasz.msg);
}

}

  return (
    <div className='login-kontener'>
        <form>
            <table>
                <tbody>
                    <tr>
                        <td>Email: </td>
                        <td><input type="email" id='email' onChange={(e) => setEmail(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Jelszó: </td>
                        <td><input type="password" id='jelszo' onChange={(e) => setJelszo(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><button onClick={(e) => belepes(e)}>Bejelentkezés</button></td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
  )
}

export default Login