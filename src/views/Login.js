import { react, useState } from 'react'
import MdpChange from '../composants/MdpChange'
import back from '../data/Back'
import { useParams, useNavigate } from "react-router-dom";
import Dialog from '../micro-composants/Dialog';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPasswordChange, setPasswordChange] = useState(false)
    const [dialogVisible, setDialogVisible] = useState(false)

    const navigate = useNavigate() 

    const onSubmit = async () => {
        const response = await back.login(email, password)

        // En fonction de la réponse de l'API suite au login,
        // Vérifier si l'utilisateur a besoin de changer son mdp
        // Et vers quel écran on le redirige
        if (response.data.success) {
            localStorage.setItem('email', email)
            localStorage.setItem('password', password)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('refresh', response.data.refreshToken)
            localStorage.setItem('utype', response.data.type)

            if (!response.data.needsNewPassword) {

                switch (response.data.type) {
                    case 'admin':
                        navigate('/')
                        break
                    case 'partenaire':
                        navigate('/partenaire-notadmin')
                        break
                    case 'structure':
                        navigate('/structure-notadmin')
                        break
                    default:
                        break
                }

            } else {
                setPasswordChange(true)
            }
        } else {
            setDialogVisible(true)
            setTimeout(() => {
                setDialogVisible(false)
            }, 5000)
        }
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
            {
                dialogVisible ?
                <Dialog type="log" logLevel="error" message="Email ou mot de passe incorrect"/>
                :
                null
            }

        </div>
    )

}

export default Login