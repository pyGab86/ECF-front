import { react, useState } from 'react'
import MdpChange from '../composants/MdpChange'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPasswordChange, setPasswordChange] = useState(false)

    const onSubmit = async () => {
        console.log(email, password)

        // En fonction de la réponse de l'API suite au login,
        // Vérifier si l'utilisateur a besoin de changer son mdp
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
            
            {
                showPasswordChange ?
                <MdpChange/>
                :
                null
            }

        </div>
    )

}

export default Login