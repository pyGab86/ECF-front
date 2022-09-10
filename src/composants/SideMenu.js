import { useNavigate } from 'react-router-dom'

// Composant menu de gauche.
// On met automatiquement en gras le lien sur le quel on se trouve
const SideMenu = (props) => {

    const navigate = useNavigate() 

    const logOut = () => {
        localStorage.clear()
        navigate('/login')
    }

    const lienAccueil = props.page === 'Accueil' ? <a href="/"><strong>Accueil</strong> </a> : <a href="/">Accueil</a>
    const lienPartenaires = props.page === 'Partenaires' ? <a href="/partenaires"><strong>Partenaires</strong> </a> : <a href="/partenaires">Partenaires</a>
    const lienStructures = props.page === 'Structures' ? <a href="/structures"><strong>Structures</strong> </a> : <a href="/structures">Structures</a>

    return (
        <div id="side-menu" className="flex column justify-between">
            <div id="menu-links-container" className="flex column gap10">
                {lienAccueil}
                {lienPartenaires}
                {lienStructures}
            </div>
            <button className="naked-button" onClick={() => {logOut()}}>Déconnexion</button>
        </div>
    )

}

export default SideMenu