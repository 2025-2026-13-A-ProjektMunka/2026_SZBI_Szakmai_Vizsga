import "./Login.css"
import { useState } from "react";


function Login({ onLogin }) {
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({ username: "", password: "" });
}

 {
        event.preventDefault();

        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) throw new Error('Login failed');
                return response.json();
            })
            .then(userData => {
                onLogin(userData); 
                setSuccessMessage('Sikeres bejelentkezés');
            })
            .catch(() => {
                setSuccessMessage('Sikertelen bejelentkezés');
            });
    }

const Login = () => {
  return (
    <div>Login</div>
  )
}

<button>Bejelentkezés</button>

export default Login;