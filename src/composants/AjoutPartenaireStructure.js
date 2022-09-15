import Modal from "./Modal"
import { useState } from "react"
import Toggle from "../micro-composants/Toggle"
import back from "../data/Back"
import Dialog from "../micro-composants/Dialog"

const AjoutPartenaireStructure = (props) => {

    const [modalOpen, setModalOpen] = useState(false)

    // State de la modale d'ajout (partenaire ou structure)
    // Partenaire
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [email, setEmail] = useState('')
    const [numeroetvoie, setNumeroetvoie] = useState('')
    const [codePostal, setCodePostal] = useState('')
    const [ville, setVille] = useState('')
    const [description, setDescription] = useState('')
    const [planning, setPlanning] = useState(false)
    const [venteBoissons, setVenteBoissons] = useState(false)
    const [venteBarres, setVenteBarres] = useState(false)
    const [emailing, setEmailing] = useState(false)
    // Structure
    const [nomStructure, setNomStructure] = useState('')
    const [prenomStructure, setPrenomStructure] = useState('')
    const [emailStructure, setEmailStructure] = useState('')
    const [numeroetvoieStructure, setNumeroetvoieStructure] = useState('')
    const [cpvilleStructure, setCpvilleStructure] = useState('')
    const [descriptionStructure, setDescriptionStructure] = useState('')
    const [planningStructure, setPlanningStructure] = useState(false)
    const [venteBoissonsStructure, setVenteBoissonsStructure] = useState(false)
    const [venteBarresStructure, setVenteBarresStructure] = useState(false)
    const [emailingStructure, setEmailingStructure] = useState(false)

    const [dialogSuccessShown, setDialogSuccessShown] = useState(false)
    const [dialogErrorShown, setDialogErrorShown] = useState(false)

    const manageModal = () => {
        if (!modalOpen) {
            setModalOpen(true)
        }
    }

    const ajouter = async () => {

        let body

        if (props.type === 'partenaire') {
            body = {
                uid: localStorage.getItem('email'),
                type: localStorage.getItem('utype'),
                action: 'add_partenaire',
                utilisateur: {
                    nom: nom,
                    prenom: prenom,
                    email: email,
                    type: "partenaire",
                    adresse: numeroetvoie,
                    code_postal: codePostal,
                    ville: ville,
                    description: description,
                    planning: planning,
                    boissons: venteBoissons,
                    barres: venteBarres,
                    emailing: emailing
                }
            }
        } else if (props.type === "structure") {

        }


        const response = await back.performAction(body)

        console.log(response)

        if (response.data.success) {
            setDialogSuccessShown(true)
            setModalOpen(false)
            setTimeout(() => {
                setDialogSuccessShown(false)
            }, 5000)
        } else {
            setModalOpen(false)
            setDialogErrorShown(true)
            setTimeout(() => {
                setDialogErrorShown(false)
            }, 5000)
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
                                <h2>Ajout {props.type}</h2>
                                {
                                    props.type === "partenaire" ?
                                    <>
                                        <input onChange={(e) => { setNom(e.target.value) }} placeholder="Nom" id="lastname-input"></input>
                                        <input onChange={(e) => { setPrenom(e.target.value) }} placeholder="Prénom" id="firstname-input"></input>
                                        <input onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" id="email-input" type="email"></input>
                                        <input onChange={(e) => { setNumeroetvoie(e.target.value) }} placeholder="Numéro et voie" id="voie-input"></input>
                                        <input onChange={(e) => { setCodePostal(e.target.value) }} placeholder="Code postal" id="cp-input"></input>
                                        <input onChange={(e) => { setVille(e.target.value) }} placeholder="Ville" id="ville-input"></input>
                                        <textarea onChange={(e) => { setDescription(e.target.value) }} placeholder="Description" id="description-input"></textarea>
                                        <div id="permissions-container">
                                            <Toggle
                                                canEdit={true}
                                                label="Gestion planning Equipe"
                                                default="desactivated"
                                                onActivate={() => { setPlanning(true) }}
                                                onDesactivate={() => { setPlanning(false) }} />
                                            <Toggle 
                                                canEdit={true}
                                                label="Vente de boissons"
                                                default="desactivated"
                                                onActivate={() => { setVenteBoissons(true) }}
                                                onDesactivate={() => { setVenteBoissons(false) }} />
                                            <Toggle
                                                canEdit={true}
                                                label="Vente barres énergétiques"
                                                default="desactivated"
                                                onActivate={() => { setVenteBarres(true) }}
                                                onDesactivate={() => { setVenteBarres(false) }} />
                                            <Toggle
                                                canEdit={true}
                                                label="Emailing"
                                                default="desactivated"
                                                onActivate={() => { setEmailing(true) }}
                                                onDesactivate={() => { setEmailing(false) }} />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <input onChange={(e) => { setNomStructure(e.target.value) }} placeholder="Nom gérant" id="lastname-input-structure"></input>
                                        <input onChange={(e) => { setPrenomStructure(e.target.value) }} placeholder="Prénom gérant" id="firstname-input-structure"></input>
                                        <input onChange={(e) => { setEmailStructure(e.target.value) }} placeholder="Email gérant" id="email-input-structure" type="email"></input>
                                        <input onChange={(e) => { setNumeroetvoieStructure(e.target.value) }} placeholder="Numéro et voie" id="voie-input-structure"></input>
                                        <input onChange={(e) => { setCpvilleStructure(e.target.value) }} placeholder="Code postal et Ville" id="ville-input-structure"></input>
                                        <textarea onChange={(e) => { setDescriptionStructure(e.target.value) }} placeholder="Description" id="description-input-structure"></textarea>
                                        <div id="permissions-container">
                                            <Toggle
                                                canEdit={true}
                                                label="Gestion planning Equipe"
                                                default="desactivated"
                                                onActivate={() => { setPlanningStructure(true) }}
                                                onDesactivate={() => { setPlanningStructure(false) }} />
                                            <Toggle
                                                canEdit={true}
                                                label="Vente de boissons"
                                                default="desactivated"
                                                onActivate={() => { setVenteBoissonsStructure(true) }}
                                                onDesactivate={() => { setVenteBoissonsStructure(false) }} />
                                            <Toggle
                                                canEdit={true}
                                                label="Vente barres énergétiques"
                                                default="desactivated"
                                                onActivate={() => { setVenteBarresStructure(true) }}
                                                onDesactivate={() => { setVenteBarresStructure(false) }} />
                                            <Toggle
                                                canEdit={true} 
                                                label="Emailing"
                                                default="desactivated"
                                                onActivate={() => { setEmailingStructure(true) }}
                                                onDesactivate={() => { setEmailingStructure(false) }} />
                                        </div>
                                    </>
                                }
                                <button id="modal-confirm" onClick={() => ajouter()}>Ajouter</button>
                            </>
                        }
                    /> 
                    : null
            }
            {
                dialogSuccessShown ?
                <Dialog type="log" logLevel="success" message="Opération réussie !" />
                :
                dialogErrorShown ?
                <Dialog type="log" logLevel="error" message="Erreur lors de l'opération" />
                :
                null
            }
        </> 
    )

}

export default AjoutPartenaireStructure