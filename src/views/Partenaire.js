import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import SideMenu from '../composants/SideMenu'
import AjoutPartenaireStructure from '../composants/AjoutPartenaireStructure'
import PartenaireStructure from '../composants/PartenaireStructure'
import Toggle from '../micro-composants/Toggle';
import Searchbar from '../micro-composants/Searchbar';
import Dialog from '../micro-composants/Dialog';

/* 
    La page permettant de voir un partenaire. Les fonctionnalités sont :
    - Voir ses infos
    - Changer son statut
    - Voir et modifier ses permissions globales
    - Voir ses structures (filtrer actives & inactives)
    - Ajouter une structure
*/
const Partenaire = (props) => {

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
    const [statutAccesDonnees, setStatutAccesDonnees] = useState('non confirmé')

    const [filterType, setFilterType] = useState('both')
    const [activatedBtnSelected, setActivatedBtnSelected] = useState(false)
    const [desactivatedBtnSelected, setDesactivatedBtnSelected] = useState(false)

    const [confirmStatusDialogShown, setConfirmDialogShown] = useState(false)

    // On comp mount: charger la data avec l'API et changer le state
    useEffect(() => {

    }, [])

    const manageFilterButtons = (action) => {
        const activateBtn = document.getElementById('show-activated')
        const desactivateBtn = document.getElementById('show-desactivated')
        if (action === 'activated') {
            setActivatedBtnSelected(!activatedBtnSelected)
            if (!activatedBtnSelected) {
                setFilterType('activated')
                activateBtn.className = 'on'
                desactivateBtn.className = 'off'
            } else {
                setFilterType('both')
                activateBtn.className = 'off'
                desactivateBtn.className = 'off'
            }
        } else if (action === "desactivated") {
            setDesactivatedBtnSelected(!desactivatedBtnSelected)
            if (!desactivatedBtnSelected) {
                setFilterType('desactivated')
                activateBtn.className = 'off'
                desactivateBtn.className = 'on'
            } else {
                setFilterType('both')
                activateBtn.className = 'off'
                desactivateBtn.className = 'off'
            }
        }
    }

    const changeStatus = (activated) => {

        if (!confirmStatusDialogShown) {
            setConfirmDialogShown(true)
        }
    }

    const dataAccess = (bool) => {
        // Api utilisée
    }

    return (
        <div id="main-app">
            <SideMenu page="Partenaires"/>
            <Searchbar/>
            <div id='partenaire-structure-container' className='flex justify-end'>
                <div id="partenaire-structure">
                    <h1>Gestion Partenaire</h1>
                    <div id='status-element' className='flex align-center gap30'>
                        <p style={{ color: `${activated ? '#157C19' : '#AA280C'}`}}><strong>Statut : {activated ? 'Activé' : 'Désactivé'}</strong></p>
                        {
                            props.rights === 'full' ?
                            <button onClick={() => { changeStatus(activated) }}>{`${activated === 'activated' ? 'Désactiver' : 'Activer'}`}</button>
                            :
                            null
                        }
                    </div>
                    {
                        props.rights === 'full' ?
                        null:
                        <div>
                            <h4>Confirmer l'accès aux données</h4>
                            <p>Si vos informations, vos permissions globales et vos structures sont bien affichées ci-dessous, veuillez cliquer sur "Confirmer". Autrement, veuillez cliquer sur "Invalider"</p>
                            <div className='flex align-center gap30'>
                                <button onClick={() => { dataAccess(false) }} id="infirmer-btn">Infirmer</button>
                                <button onClick={() => { dataAccess(true) }} id="confirmer-btn">Confirmer</button>
                            </div>
                        </div>
                    }
                    <div id="infos-partenaire-structure" className='flex align-start justify-between gap30'>
                        <div id='basic-info'>
                            <p><strong>Nom :</strong> {nom}</p>
                            <p><strong>Prénom :</strong> {prenom}</p>
                            <p><strong>Email :</strong> {email}</p>
                            <p><strong>Rue :</strong> {rue}</p>
                            <p><strong>CP & ville :</strong> {cpville}</p>
                            {
                                props.rights === 'full' ?
                                <p><strong>Statut accès données : {statutAccesDonnees}</strong></p>
                                :
                                null
                            }
                        </div>
                        <div id="description">
                            <p>{description}</p>
                        </div>
                    </div>

                    {
                        props.rights === 'full' ? 
                        <h3>Permissions globales du partenaire</h3>
                        :
                        <h3>Mes permissions globales</h3>
                    }
                    <div id="permissions-container" className='flex gap30 align-start justify-start'>
                        {
                            props.rights === 'full' ?
                            <>
                                <Toggle
                                    canEdit={true}
                                    label="Gestion planning Equipe"
                                    default={planning}
                                    onActivate={() => { setPlanning(true) }}
                                    onDesactivate={() => { setPlanning(false) }} />
                                <Toggle
                                    canEdit={true}
                                    label="Vente de boissons"
                                    default={boissons}
                                    onActivate={() => { setBoissons(true) }}
                                    onDesactivate={() => { setBoissons(false) }} />
                                <Toggle
                                    canEdit={true}
                                    label="Vente barres énergétiques"
                                    default={barres}
                                    onActivate={() => { setBarres(true) }}
                                    onDesactivate={() => { setBarres(false) }} />
                                <Toggle
                                    canEdit={true}
                                    label="Emailing"
                                    default={emailing}
                                    onActivate={() => { setEmailing(true) }}
                                    onDesactivate={() => { setEmailing(false) }} />
                            </>
                            :
                            <>
                                <Toggle
                                    canEdit={false}
                                    label="Gestion planning Equipe"
                                    default={planning} />
                                <Toggle
                                    canEdit={false}
                                    label="Vente de boissons"
                                    default={boissons} />
                                <Toggle
                                    canEdit={false}
                                    label="Vente barres énergétiques"
                                    default={barres} />
                                <Toggle
                                    canEdit={false}
                                    label="Emailing"
                                    default={emailing} />
                            </>
                            
                        }
                    </div>

                    {
                        props.rights === 'full' ?
                        <h3>Structures du partenaire</h3>
                        :
                        <h3>Mes structures</h3>
                    }
                    <div className='flex align-center gap30'>
                        <button className='off' id='show-activated' onClick={() => { manageFilterButtons('activated') }}>Structures actives</button>
                        <button className='off' id='show-desactivated' onClick={() => { manageFilterButtons('desactivated') }}>Structures inactives</button>
                    </div>
                    <div className='minis-grid flex gap10'>
                        {
                            props.rights === 'full' ?
                            <AjoutPartenaireStructure type="structure"/>
                            :
                            null
                        }
                        <PartenaireStructure filter={filterType} rights={props.rights} type="structure" prenom="Didier" nom="Durand" rue="23 rue de la Libération" cpville="75000 Paris" email="didier@gmail.com" status="Inactif"/>
                        <PartenaireStructure filter={filterType} rights={props.rights} type="structure" prenom="Didier" nom="Durand" rue="23 rue de la Libération" cpville="75000 Paris" email="didier@gmail.com" status="Inactif"/>
                        <PartenaireStructure filter={filterType} rights={props.rights} type="structure" prenom="Didier" nom="Durand" rue="23 rue de la Libération" cpville="75000 Paris" email="didier@gmail.com" status="Actif"/>
                        <PartenaireStructure filter={filterType} rights={props.rights} type="structure" prenom="Didier" nom="Durand" rue="23 rue de la Libération" cpville="75000 Paris" email="didier@gmail.com" status="Actif"/>
                        <PartenaireStructure filter={filterType} rights={props.rights} type="structure" prenom="Didier" nom="Durand" rue="23 rue de la Libération" cpville="75000 Paris" email="didier@gmail.com" status="Actif"/>
                    </div>
                </div>
            </div>
            {
                confirmStatusDialogShown ?
                <Dialog
                    type="confirm"
                    text={`Confirmez-vous vouloir changer le statut de ce partenaire ? Le nouveau statut sera réglé sur : ${activated ? 'Désactivé' : 'Actif'}`}
                    onCancel={() => { console.log('status change canceled'); setConfirmDialogShown(false) }}
                    onConfirm={() => { console.log('status change confirmed!'); setConfirmDialogShown(false) }}
                />
                :
                null
            }
        </div>
    )

}

export default Partenaire