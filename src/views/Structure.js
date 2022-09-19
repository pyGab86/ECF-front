import SideMenu from "../composants/SideMenu"
import Searchbar from "../micro-composants/Searchbar"
import Toggle from "../micro-composants/Toggle";
import Dialog from "../micro-composants/Dialog";
import back from "../data/Back";
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";

const Structure = (props) => {

    const id = parseInt(useParams().id)
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [email, setEmail] = useState('')
    const [rue, setRue] = useState('')
    const [cpville, setCpville] = useState('')
    const [description, setDescription] = useState('')
    const [activated, setActivated] = useState(false)
    const [planning, setPlanning] = useState(false)
    const [boissons, setBoissons] = useState(false)
    const [barres, setBarres] = useState(false)
    const [emailing, setEmailing] = useState(false)
    const [confirmStatusDialogShown, setConfirmDialogShown] = useState(false)
    const [permissionsShown, setPermissionsShown] = useState(false)

    const changeStatus = () => {

        let body = {
            action: 'change_statut',
            options: {
                of: 'structure', 
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
                of: 'structure',
                id,
                email,
                nom,
                prenom
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

    // Vérifier que l'utilisateur est connecté
    // Si non -> redirection vers page login
    // Si oui mais que partenaire ou structure : redirection en arrière
    const navigate = useNavigate() 
    useEffect(() => {
        if (localStorage.getItem('email') === null) {
            navigate('/login')
        } else if (typeof id === "undefined" || id === null) {
            navigate(`/structure-notadmin/${localStorage.getItem('email')}/${localStorage.getItem('id')}`)
        } else {
            back.getData('structure', { id })
            .then(res => {
                if (res.data.success) {
                    setNom(res.data.data[0].nom_gerant)
                    setPrenom(res.data.data[0].prenom_gerant)
                    setEmail(res.data.data[0].email_gerant)
                    setRue(res.data.data[0].adresse)
                    setCpville(`${res.data.data[0].code_postal} ${res.data.data[0].ville}`)
                    setDescription(res.data.data[0].description)
                    setActivated(res.data.data[0].statut === 'actif' ? true : false)
                }
            })
            .catch(err => {
                console.log(err)
            })

            back.getData('permissions', { of: 'structure', id })
            .then(res => {
                if (res.data.success) {
                    setPlanning(res.data.data[0].gestion_planning_team)
                    setBoissons(res.data.data[0].vente_boissons)
                    setBarres(res.data.data[0].vente_barres)
                    setEmailing(res.data.data[0].emailing)
                    setPermissionsShown(true)
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [])

    return (
        <div id="main-app">
            <SideMenu page="Structures"/>
            <Searchbar/>
            <div id='partenaire-structure-container' className='flex justify-end'>
                <div id="partenaire-structure">
                    <h1>Gestion Structure</h1>
                    <div id='status-element' className='flex align-center gap30'>
                        <p style={{ color: `${activated ? '#157C19' : '#AA280C'}`}}><strong>Statut : {activated ? 'Activée' : 'Désactivée'}</strong></p>
                        {
                            props.rights === "full" ?
                            <button onClick={() => { setConfirmDialogShown(true) }}>Changer</button>
                            :
                            null
                        }
                    </div>
                    <div id="infos-partenaire-structure" className='flex align-start justify-between gap30'>
                        <div id='basic-info'>
                            <p><strong>Nom gérant :</strong> {nom}</p>
                            <p><strong>Prénom gérant :</strong> {prenom}</p>
                            <p><strong>Email gérant :</strong> {email}</p>
                            <p><strong>Rue :</strong> {rue}</p>
                            <p><strong>CP & ville :</strong>{cpville}</p>
                        </div>
                        <div id="description">
                            <p>{description}</p>
                        </div>
                    </div>

                    {
                        permissionsShown ?
                        <>
                            <h3>Permissions de la structure</h3>
                            <div id="permissions-container" className='flex gap30 align-start justify-start'>
                                {
                                    props.rights === "full" ?
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
                                            default={planning}/>
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
                        </>
                        :
                        null
                    }
                </div>
            </div>
            {
                confirmStatusDialogShown ?
                <Dialog
                    type="confirm"
                    text={`Confirmez-vous vouloir changer le statut de cette structure ? Le nouveau statut sera réglé sur : ${activated ? 'Désactivée' : 'Active'}`}
                    onCancel={() => { setConfirmDialogShown(false) }}
                    onConfirm={() => { changeStatus(); setConfirmDialogShown(false) }}
                />
                :
                null
            }
        </div>
    )
}

export default Structure