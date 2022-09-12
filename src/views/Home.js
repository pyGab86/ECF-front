import { react, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SideMenu from '../composants/SideMenu'
import PartenaireStructure from '../composants/PartenaireStructure'
import AjoutPartenaireStructure from '../composants/AjoutPartenaireStructure'
import Searchbar from '../micro-composants/Searchbar'

const Home = () => {

    const [filterType, setFilterType] = useState('both')
    const [activatedBtnSelected, setActivatedBtnSelected] = useState(false)
    const [desactivatedBtnSelected, setDesactivatedBtnSelected] = useState(false)

    // Vérifier que l'utilisateur est connecté
    // Si non -> redirection vers page login
    const navigate = useNavigate() 
    useEffect(() => {
        if (localStorage.getItem('email') === null) {
            //navigate('/login')
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
                        <PartenaireStructure filter={filterType} type="partenaire" prenom="Didier" nom="Durand" rue="23 rue de la Libération" cpville="75000 Paris" email="didier@gmail.com" status="Inactif"/>
                        <PartenaireStructure filter={filterType} type="partenaire" prenom="Didier" nom="Durand" rue="23 rue de la Libération" cpville="75000 Paris" email="didier@gmail.com" status="Inactif"/>
                        <PartenaireStructure filter={filterType} type="partenaire" prenom="Didier" nom="Durand" rue="23 rue de la Libération" cpville="75000 Paris" email="didier@gmail.com" status="Actif"/>
                        <PartenaireStructure filter={filterType} type="partenaire" prenom="Didier" nom="Durand" rue="23 rue de la Libération" cpville="75000 Paris" email="didier@gmail.com" status="Actif"/>
                        <PartenaireStructure filter={filterType} type="partenaire" prenom="Didier" nom="Durand" rue="23 rue de la Libération" cpville="75000 Paris" email="didier@gmail.com" status="Actif"/>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Home