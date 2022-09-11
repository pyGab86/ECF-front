import Modal from "./Modal"
import { useState } from "react"

const AjoutPartenaireStructure = (props) => {

    const [modalOpen, setModalOpen] = useState(false)

    const manageModal = () => {
        if (!modalOpen) {
            setModalOpen(true)
        }
    }

    return (
        <>
            <div className="add-partenaire-structure flex column align-center justify-center" onClick={() => { manageModal() }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 24 24"><path fill="white" d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"/></svg>
                <p>Ajouter {props.type}</p>
            </div> 
            {
                modalOpen ? 
                    <Modal 
                        onClose={() => { setModalOpen(false); }} 
                        content={
                            <>
                                <h2>Ajout d'un partenaire</h2>
                                <input placeholder="Nom" id="lastname-input"></input>
                                <input placeholder="Prénom" id="firstname-input"></input>
                                <input placeholder="Email" id="email-input" type="email"></input>
                                <input placeholder="Numéro et voie" id="voie-input"></input>
                                <input placeholder="Code postal et Ville" id="ville-input"></input>
                                <input placeholder="Description" id="description-input"></input>

                            </>
                        }
                    /> 
                    : null
            }
        </> 
    )

}

export default AjoutPartenaireStructure