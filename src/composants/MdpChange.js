import Modal from "./Modal"
import { useState } from "react"
import back from "../data/Back"
import Dialog from "../micro-composants/Dialog"
import { useNavigate } from "react-router-dom";

// Si c'est le premier login du partenaire / strucure : on ouvre
// une modale demandant un nouveau mdp
const MdpChange = (props) => {

    const [modalOpen, setModalOpen] = useState(true)
    const [password, setPassword] = useState('')
    const [dialogShown, setDialogShown] = useState(false)

    const navigate = useNavigate()

    const submit = () => {
        back.performAction({
            requested: 'change_password',
            action: 'change_password',
            options: { password }
        })
        .then(res => {
            console.log(res)
            if (res.data.success) {
                localStorage.setItem('password', res.data.password)
                switch (res.data.type) {
                    case 'admin':
                        navigate('/')
                        break
                    case 'partenaire':
                        navigate('/partenaire') // Redirection auto vers ...-notadmin
                        break
                    case 'structure':
                        navigate('/structure') // Redirection auto vers ...-notadmin
                        break
                    default:
                        break
                }
            } else {
                setDialogShown(true)
                setTimeout(() => {
                    setDialogShown(false)
                }, 5000)
            }
        })
    }
 
    if (modalOpen) {
        return <>
            <Modal
                onClose={() => { setModalOpen(false) }}
                content={
                    <>
                        <h2>Connexion réussie</h2>
                        <p>Afin de sécuriser votre compte, veuillez changer votre mot de passe</p>
                        <input 
                            onChange={(e) => {setPassword(e.target.value)}}
                            placeholder="Nouveau mot de passe"
                            type="password">
                        </input>
                        <button onClick={() => {submit()}}>Continuer</button>
                    </>
                }
            />
            {
                dialogShown ?
                <Dialog type="log" loglevel="error" message="Impossible de changer votre mot de passe"/>
                :
                null
            }
        </>
    } else {
        return null
    }

}

export default MdpChange