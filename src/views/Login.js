import { react, useState } from 'react'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = async () => {
        console.log(email, password)
    } 

    return (
        <div className='full-window flex justify-center align-center'>
            <div id="login-container">
                <div id="login" className='flex column justify-between align-center'>
                    <h1>Connexion</h1>
                    <div className='flex column align-center gap10'>
                        <input onChange={(e) => {setEmail(e.target.value)}} type='email' placeholder='Email'></input>
                        <input onChange={(e) => {setPassword(e.target.value)}} type='password' placeholder='Mot de passe'></input> 
                    </div>
                    <button onClick={() => {onSubmit()}}>Continuer</button>
                </div>
            </div>
        </div>
    )

}

export default Login