import Modal from "./Modal"
import { useState } from "react"
import Toggle from "../micro-composants/Toggle"

const AjoutPartenaireStructure = (props) => {

    const [modalOpen, setModalOpen] = useState(false)

    // State de la modale d'ajout
    // Partenaire
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [email, setEmail] = useState('')
    const [numeroetvoie, setNumeroetvoie] = useState('')
    const [cpville, setCpville] = useState('')
    const [description, setDescription] = useState('')
    const [planning, setPlanning] = useState("desactivated")
    const [venteBoissons, setVenteBoissons] = useState("desactivated")
    const [venteBarres, setVenteBarres] = useState("desactivated")
    const [emailing, setEmailing] = useState("desactivated")

    const manageModal = () => {
        if (!modalOpen) {
            setModalOpen(true)
        }
    }

    const ajouter = async () => {
        // api.addNew(props.type, {})
        console.log(nom, prenom, email, numeroetvoie, cpville, description, planning, venteBoissons, venteBarres, emailing)
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
                                <h2>Ajout {props.type}</h2>
                                {
                                    props.type === "partenaire" ?
                                    <>
                                        <input onChange={(e) => { setNom(e.target.value) }} placeholder="Nom" id="lastname-input"></input>
                                        <input onChange={(e) => { setPrenom(e.target.value) }} placeholder="Prénom" id="firstname-input"></input>
                                        <input onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" id="email-input" type="email"></input>
                                        <input onChange={(e) => { setNumeroetvoie(e.target.value) }} placeholder="Numéro et voie" id="voie-input"></input>
                                        <input onChange={(e) => { setCpville(e.target.value) }} placeholder="Code postal et Ville" id="ville-input"></input>
                                        <textarea onChange={(e) => { setDescription(e.target.value) }} placeholder="Description" id="description-input"></textarea>
                                        <div id="permissions-container">
                                            <Toggle 
                                                label="Gestion planning Equipe"
                                                default="desactivated"
                                                onActivate={() => { setPlanning(true) }}
                                                onDesactivate={() => { setPlanning(false) }} />
                                            <Toggle 
                                                label="Vente de boissons"
                                                default="desactivated"
                                                onActivate={() => { setVenteBoissons(true) }}
                                                onDesactivate={() => { setVenteBoissons(false) }} />
                                            <Toggle 
                                                label="Vente barres énergétiques"
                                                default="desactivated"
                                                onActivate={() => { setVenteBarres(true) }}
                                                onDesactivate={() => { setVenteBarres(false) }} />
                                            <Toggle 
                                                label="Emailing"
                                                default="desactivated"
                                                onActivate={() => { setEmailing(true) }}
                                                onDesactivate={() => { setEmailing(false) }} />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <input placeholder="structure"></input>
                                    </>
                                }
                                <button id="modal-confirm" onClick={() => ajouter()}>Ajouter</button>
                            </>
                        }
                    /> 
                    : null
            }
        </> 
    )

}

export default AjoutPartenaireStructure