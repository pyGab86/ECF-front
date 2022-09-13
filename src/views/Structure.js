import SideMenu from "../composants/SideMenu"
import Searchbar from "../micro-composants/Searchbar"
import Toggle from "../micro-composants/Toggle";
import Dialog from "../micro-composants/Dialog";
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

const Structure = (props) => {

    const [nom, setNom] = useState('Undefined')
    const [prenom, setPrenom] = useState('Undefined')
    const [email, setEmail] = useState(useParams().email)
    const [rue, setRue] = useState('Undefined')
    const [cpville, setCpville] = useState('Undefined')
    const [description, setDescription] = useState('Laudantium aliquam cupiditate commodi beatae eveniet, repellendus accusantium soluta libero ad est tenetur asperiores deserunt architecto consectetur nesciunt quo perferendis accusamus nobis.')
    const [activated, setActivated] = useState(false)
    const [planning, setPlanning] = useState('desactivated')
    const [boissons, setBoissons] = useState('desactivated')
    const [barres, setBarres] = useState('desactivated')
    const [emailing, setEmailing] = useState('desactivated')

    const [confirmStatusDialogShown, setConfirmDialogShown] = useState(false)

    const changeStatus = (activated) => {

        if (!confirmStatusDialogShown) {
            setConfirmDialogShown(true)
        }
    }

    return (
        <div id="main-app">
            <SideMenu page="Partenaires"/>
            <Searchbar/>
            <div id='partenaire-structure-container' className='flex justify-end'>
                <div id="partenaire-structure">
                    <h1>Gestion Structure</h1>
                    <div id='status-element' className='flex align-center gap30'>
                        <p style={{ color: `${activated ? '#157C19' : '#AA280C'}`}}><strong>Statut : {activated ? 'Activée' : 'Désactivée'}</strong></p>
                        <button onClick={() => { changeStatus(activated) }}>{`${activated === 'activated' ? 'Désactiver' : 'Activer'}`}</button>
                    </div>
                    <div id="infos-partenaire-structure" className='flex align-start justify-between gap30'>
                        <div id='basic-info'>
                            <p><strong>Nom gérant:</strong> {nom}</p>
                            <p><strong>Prénom gérant:</strong> {prenom}</p>
                            <p><strong>Email gérant:</strong> {email}</p>
                            <p><strong>Rue :</strong> {rue}</p>
                            <p><strong>CP & ville :</strong> {cpville}</p>
                        </div>
                        <div id="description">
                            <p>{description}</p>
                        </div>
                    </div>

                    <h3>Permissions de la structure</h3>
                    <div id="permissions-container" className='flex gap30 align-start justify-start'>
                        <Toggle 
                            label="Gestion planning Equipe"
                            default={planning}
                            onActivate={() => { setPlanning(true) }}
                            onDesactivate={() => { setPlanning(false) }} />
                        <Toggle 
                            label="Vente de boissons"
                            default={boissons}
                            onActivate={() => { setBoissons(true) }}
                            onDesactivate={() => { setBoissons(false) }} />
                        <Toggle 
                            label="Vente barres énergétiques"
                            default={barres}
                            onActivate={() => { setBarres(true) }}
                            onDesactivate={() => { setBarres(false) }} />
                        <Toggle 
                            label="Emailing"
                            default={emailing}
                            onActivate={() => { setEmailing(true) }}
                            onDesactivate={() => { setEmailing(false) }} />
                    </div>
                </div>
            </div>
            {
                confirmStatusDialogShown ?
                <Dialog
                    type="confirm"
                    text={`Confirmez-vous vouloir changer le statut de cette structure ? Le nouveau statut sera réglé sur : ${activated ? 'Désactivée' : 'Active'}`}
                    onCancel={() => { console.log('status change canceled'); setConfirmDialogShown(false) }}
                    onConfirm={() => { console.log('status change confirmed!'); setConfirmDialogShown(false) }}
                />
                :
                null
            }
        </div>
    )
}

export default Structure