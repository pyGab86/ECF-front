import Modal from "./Modal"
import { useState } from "react"

// Si c'est le premier login du partenaire / strucure : on ouvre
// une modale demandant un nouveau mdp
const MdpChange = () => {

    const [modalOpen, setModalOpen] = useState(true)

    if (modalOpen) {
        return <Modal
            onClose={() => { setModalOpen(false) }}
            content={
                <>
                    <h2>Personnaliser mon mot de passe</h2>
                    <input placeholder="Nouveau mot de passe"></input>
                    <input placeholder="Confirmer mot de passe"></input>
                </>
            }
        />
    } else {
        return null
    }

}

export default MdpChange