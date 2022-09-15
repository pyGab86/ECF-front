import Modal from "./Modal"
import { useState } from "react"
import back from "../data/Back"

// Si c'est le premier login du partenaire / strucure : on ouvre
// une modale demandant un nouveau mdp
const MdpChange = () => {

    const [modalOpen, setModalOpen] = useState(true)
    const [password, setPassword] = useState('')

    const submit = (newPassword) => {
        //back.changePassword(newPassword)
    }
 
    if (modalOpen) {
        return <Modal
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
                    <button>Continuer</button>
                </>
            }
        />
    } else {
        return null
    }

}

export default MdpChange