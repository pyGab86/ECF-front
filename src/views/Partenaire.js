import { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import SideMenu from '../composants/SideMenu'
import AjoutPartenaireStructure from '../composants/AjoutPartenaireStructure'
import PartenaireStructure from '../composants/PartenaireStructure'
import Toggle from '../micro-composants/Toggle';
import Searchbar from '../micro-composants/Searchbar';
import Dialog from '../micro-composants/Dialog';
import back from '../data/Back';

/* 
    La page permettant de voir un partenaire. Les fonctionnalités sont :
    - Voir ses infos
    - Changer son statut
    - Voir et modifier ses permissions globales
    - Voir ses structures (filtrer actives & inactives)
    - Ajouter une structure
*/
const Partenaire = (props) => {

    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [email, setEmail] = useState('')
    const id = parseInt(useParams().id)
    const [rue, setRue] = useState('')
    const [cpville, setCpville] = useState('')
    const [description, setDescription] = useState('')
    const [activated, setActivated] = useState(false)
    const [planning, setPlanning] = useState(false)
    const [boissons, setBoissons] = useState(false)
    const [barres, setBarres] = useState(false)
    const [emailing, setEmailing] = useState(false)
    const [statutAccesDonnees, setStatutAccesDonnees] = useState('non confirmé')
    const [filterType, setFilterType] = useState('both')
    const [activatedBtnSelected, setActivatedBtnSelected] = useState(false)
    const [desactivatedBtnSelected, setDesactivatedBtnSelected] = useState(false)
    const [confirmStatusDialogShown, setConfirmDialogShown] = useState(false)
    const [permissionsShown, setPermissionsShown] = useState(false)
    const [structures, setStructures] = useState([])
    const [confirmStatusChangeDialogShown, setConfirmStatusChangeDialogShown] = useState(false)
    const [errorStatusChangeDialogShown, setErrorStatusChangeDialogShown] = useState(false)

    const changeStatus = () => {

        let body = {
            action: 'change_statut',
            options: {
                of: 'partenaire',
                current: activated ? 'actif' : 'inactif',
                id,
                email,
                nom,
                prenom
            }
        }

        back.performAction(body)
        .then(res => {
            if (res.data.success) {
                window.location.reload()
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const changePermission = (permission, current) => {

        back.performAction({
            action: 'change_permission',
            options: {
                permission,
                current,
                of: 'partenaire',
                id,
                nom,
                prenom,
                email
            }
        })
        .then(res => {
            console.log(res)
            if (res.data.success) {
                window.location.reload()
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    console.log('user rights:', props.rights)

    // Vérifier que l'utilisateur est connecté
    // Si non -> redirection vers page login
    // Si oui mais que partenaire ou structure : redirection en arrière
    const navigate = useNavigate()
    useEffect(() => {
        
        if (localStorage.getItem('email') === null || typeof localStorage.getItem('email') === "undefined") {
            navigate('/login')
        }

        if (localStorage.getItem('utype') != 'admin') {

            if (localStorage.getItem('utype') === 'partenaire' && !window.location.pathname.includes('notadmin')) {
                navigate(`/partenaire-notadmin`)

            } else if (localStorage.getItem('utype') === 'partenaire') {
                // Charger les données
                // Infos partenaire
                back.getData('self-partenaire', { email: localStorage.getItem('email') })
                    .then(res => {
                        if (res.data.success) {
                            setNom(res.data.data[0].nom)
                            setPrenom(res.data.data[0].prenom)
                            setEmail(res.data.data[0].email)
                            setRue(res.data.data[0].adresse)
                            setCpville(`${res.data.data[0].code_postal} ${res.data.data[0].ville}`)
                            setStatutAccesDonnees(res.data.data[0].statut_acces_donnees)
                            setDescription(res.data.data[0].description)
                            setActivated(res.data.data[0].statut === 'actif' ? true : false)
                        }
                    })
                    .catch(err => console.log(err))

                // Permisisons
                back.getData('self-permissions', { id: parseInt(localStorage.getItem('id')), of: 'partenaire' })
                .then(res => {
                    console.log(res)
                    if (res.data.success) {
                        setEmailing(res.data.data[0].emailing)
                        setPlanning(res.data.data[0].gestion_planning_team)
                        setBarres(res.data.data[0].vente_barres)
                        setBoissons(res.data.data[0].vente_boissons)
                        setPermissionsShown(true)
                    }
                })
                .catch(err => console.log(err))

                // Structures
                back.getData('self-structures', { email: localStorage.getItem('email') })
                .then(res => {
                    console.log(res)
                    if (res.data.success) {
                        setStructures(res.data.data)
                    }
                })
                .catch(err => console.log(err))


            // Une structure ne peut pas voir une page partenaire
            } else if (localStorage.getItem('utype') === 'structure') {
                navigate(`/structure-notadmin`)
            }
        } else {
            // Récupérer les infos du partenaire
            back.getData('partenaire', { id })
                .then(res => { 
                    if (res.data.success) {
                        setNom(res.data.data[0].nom)
                        setPrenom(res.data.data[0].prenom)
                        setEmail(res.data.data[0].email)
                        setRue(res.data.data[0].adresse)
                        setCpville(`${res.data.data[0].code_postal} ${res.data.data[0].ville}`)
                        setStatutAccesDonnees(res.data.data[0].statut_acces_donnees)
                        setDescription(res.data.data[0].description)
                        setActivated(res.data.data[0].statut === 'actif' ? true : false)
                    }
                })
                .catch(err => { console.log(err) })

            // Récupérer les permissions du partenaire
            back.getData('permissions', { of: 'partenaire', id })
                .then(res => {
                    if (res.data.success) {
                        setEmailing(res.data.data[0].emailing)
                        setPlanning(res.data.data[0].gestion_planning_team)
                        setBarres(res.data.data[0].vente_barres)
                        setBoissons(res.data.data[0].vente_boissons)
                        setPermissionsShown(true)
                    }
                })
                .catch(err => { console.log(err) })

            // Récupérer les structures du partenaire
            back.getData('structures', { from: 'partenaire', id })
                .then(res => {
                    if (res.data.success) {
                        setStructures(res.data.data)
                    }
                })
                .catch(err => { console.log(err) })
        }
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

    const dataAccess = (statut) => {

        back.performAction({
            action: 'data-access-status',
            options: {
                statut,
                id: parseInt(localStorage.getItem('id'))
            }
        })
        .then(res => {
            console.log(res)
            if (res.data.success) {
                setConfirmStatusChangeDialogShown(true)
                setTimeout(() => {
                    setConfirmStatusChangeDialogShown(false)
                }, 5000)
            } else {
                setErrorStatusChangeDialogShown(true)
                setTimeout(() => {
                    setErrorStatusChangeDialogShown(false)
                }, 5000)
            }
        })
        .catch(err => {
            setErrorStatusChangeDialogShown(true)
            setTimeout(() => {
                setErrorStatusChangeDialogShown(false)
            }, 5000)
        })

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
                            <button onClick={() => { setConfirmDialogShown(true) }}>Changer</button>
                            :
                            null
                        }
                    </div>
                    {
                        props.rights === 'full' ?
                        null
                        :
                        <div>
                            <h4>Confirmer l'accès aux données</h4>
                            <p>Si vos informations, vos permissions globales et vos structures sont bien affichées ci-dessous, veuillez cliquer sur "Confirmer". Autrement, veuillez cliquer sur "Invalider". <strong>Veuillez noter que ces boutons seront toujours disponibles afin que vous puissiez changer le statut d'accès à vos données dès que celui-ci change.</strong></p>
                            <div className='flex align-center gap30'>
                                <button onClick={() => { dataAccess('infirmé') }} id="infirmer-btn">Infirmer</button>
                                <button onClick={() => { dataAccess('confirmé') }} id="confirmer-btn">Confirmer</button>
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
                        permissionsShown ?
                            props.rights === 'full' ? 
                            <h3>Permissions globales du partenaire</h3>
                            :
                            <h3>Mes permissions globales</h3>
                        :
                        null
                    }
                    
                    {
                        permissionsShown ? 
                        <div id="permissions-container" className='flex gap30 align-start justify-start'>
                        {
                            props.rights === 'full' ?
                            <>
                                <Toggle
                                    canEdit={true}
                                    label="Gestion planning Equipe"
                                    default={planning} 
                                    onActivate={() => { changePermission('gestion_planning_team', true) }}
                                    onDesactivate={() => { changePermission('gestion_planning_team', false) }} />
                                <Toggle
                                    canEdit={true}
                                    label="Vente de boissons"
                                    default={boissons}
                                    onActivate={() => { changePermission('vente_boissons', true) }}
                                    onDesactivate={() => { changePermission('vente_boissons', false) }} />
                                <Toggle
                                    canEdit={true}
                                    label="Vente barres énergétiques"
                                    default={barres}
                                    onActivate={() => { changePermission('vente_barres', true) }}
                                    onDesactivate={() => { changePermission('vente_barres', false) }} />
                                <Toggle
                                    canEdit={true}
                                    label="Emailing"
                                    default={emailing}
                                    onActivate={() => { changePermission('emailing', true) }}
                                    onDesactivate={() => { changePermission('emailing', false) }} />
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
                        :
                        null
                    }

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
                            <AjoutPartenaireStructure type="structure" idPartenaire={id} emailPartenaire={email}/>
                            :
                            null
                        }{
                            structures.map(structure => {
                                return <PartenaireStructure
                                    key={Math.random()} 
                                    id={structure.id}
                                    filter={filterType}
                                    rights={props.rights}
                                    type="structure"
                                    prenom={structure.prenom_gerant}
                                    nom={structure.nom_gerant}
                                    rue={structure.adresse}
                                    cpville={`${structure.code_postal} ${structure.ville}`}
                                    email={structure.email_gerant}
                                    status={structure.statut}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
            {
                confirmStatusDialogShown ?
                <Dialog
                    type="confirm"
                    text={`Confirmez-vous vouloir changer le statut de ce partenaire ? Le nouveau statut sera réglé sur : ${activated ? 'Désactivé' : 'Actif'}`}
                    onCancel={() => { setConfirmDialogShown(false) }}
                    onConfirm={() => { changeStatus(); setConfirmDialogShown(false) }}
                />
                :
                null
            }
            {
                confirmStatusChangeDialogShown ?
                <Dialog
                    type="log"
                    logLevel="success"
                    message="Merci pour votre confirmation. Vous aurez toujours la possibilité d'infirmer et de confirmer votre accès aux données"
                />
                :
                null
            }
            {
                errorStatusChangeDialogShown ?
                <Dialog
                    type="log"
                    logLevel="error"
                    message="Une erreur est survenue. Veuillez réessayer plus tard"
                />
                :
                null
            }
        </div>
    )

}

export default Partenaire