import { react, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SideMenu from '../composants/SideMenu'
import PartenaireStructure from '../composants/PartenaireStructure'
import AjoutPartenaireStructure from '../composants/AjoutPartenaireStructure'
import Searchbar from '../micro-composants/Searchbar'
import back from '../data/Back'

const Home = (props) => {

    const [filterType, setFilterType] = useState('both')
    const [activatedBtnSelected, setActivatedBtnSelected] = useState(false)
    const [desactivatedBtnSelected, setDesactivatedBtnSelected] = useState(false)

    const [partenaires, setPartenaires] = useState([])

    // Vérifier que l'utilisateur est connecté
    // Si non -> redirection vers page login
    // Si oui mais que partenaire ou structure : redirection en arrière
    const navigate = useNavigate() 
    useEffect(() => {
        console.log(localStorage.getItem('utype'))
        if (localStorage.getItem('email') === null) {
            navigate('/login')
        }
        if (localStorage.getItem('utype') != 'admin') {
            if (localStorage.getItem('utype') === 'partenaire') {
                navigate('/partenaire-notadmin')
            } else {
                navigate(`/structure-notadmin/:${localStorage.getItem('email')}`)
            }
        } else {
            // Récupération des partenaires
            back.getData('partenaires')
                .then(res => { setPartenaires(res.data.data) })
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

    return (
        <div id="main-app">
            <SideMenu page="Partenaires"/>
            <Searchbar/>
            <div id='home-container' className='flex justify-end'>
                <div id="home">
                    <h1>Bienvenue !</h1>
                    <p>Liste des partenaires</p>
                    <div className='flex align-center gap30'>
                        <button className='off' id='show-activated' onClick={() => { manageFilterButtons('activated') }}>Partenaires actifs</button>
                        <button className='off' id='show-desactivated' onClick={() => { manageFilterButtons('desactivated') }}>Partenaires inactifs</button>
                    </div>
                    <div className='minis-grid flex gap10'>
                        <AjoutPartenaireStructure type="partenaire"/>
                        {
                            partenaires.map(partenaire => {
                                return <PartenaireStructure
                                    filter={filterType}
                                    rights={props.rights}
                                    type="partenaire"
                                    prenom={partenaire.prenom}
                                    nom={partenaire.nom}
                                    rue={partenaire.adresse}
                                    cpville={`${partenaire.code_postal} ${partenaire.ville}`}
                                    email={partenaire.email}
                                    status={partenaire.statut}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Home