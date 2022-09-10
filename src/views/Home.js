import { react, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SideMenu from '../composants/SideMenu'
import PartenaireStructure from '../composants/PartenaireStructure'

const Home = () => {

    // Vérifier que l'utilisateur est connecté
    // Si non -> redirection vers page login
    const navigate = useNavigate() 
    useEffect(() => {
        if (localStorage.getItem('email') === null) {
            //navigate('/login')
        }
    }, [])

    return (
        <div id="main-app">
            <SideMenu page="Accueil"/>
            <div id='home-container' className='flex justify-end'>
                <div id="home">
                    <h1>Bienvenue !</h1>
                    <p>Derniers partenaires inscrits</p>
                    <div className='minis-grid'>
                        <PartenaireStructure prenom="Didier" nom="Durand" rue="23 rue de la Libération" cpville="75000 Paris" email="didier@gmail.com" status="Active"/>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Home