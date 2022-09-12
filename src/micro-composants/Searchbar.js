import { useState } from "react"
import Modal from "../composants/Modal"

// IMPORTANT : côté back, on vérifie le type d'utilisateur à l'origine de la recherche
// Si admin : on renvoit tous les résultats
// Si partenaire : on ne renvoit que les structures de ce partenaire
// Si structure : pas d ebarre de recherche
const Searchbar = () => {

    const [searchString, setSearchString] = useState('')
    const [searchFilter, setSearchFilter] = useState('both')
    const [settingsWindowShown, setSettingsWindowShown] = useState(false)
    const [activatedSelected, setActivatedSelected] = useState(true)
    const [desactivatedSelected, setDesactivatedSelected] = useState(true)

    const manageFilters = () => {

        if (activatedSelected && desactivatedSelected) {
            setSearchFilter('both')
        } else if (activatedSelected && !desactivatedSelected) {
            setSearchFilter('activated')
        } else if (!activatedSelected && desactivatedSelected) {
            setSearchFilter('desactivated')
        }
    }

    const checkboxChangeManager = (box, e) => {
        
        if (box === 'actives') {
            if (activatedSelected && desactivatedSelected) {
                e.target.className = 'no-selected'
                setActivatedSelected(false)
            } else if (!activatedSelected) {
                e.target.className = 'selected'
                setActivatedSelected(true)
            }
        } else {
            if (activatedSelected && desactivatedSelected) {
                e.target.className = 'no-selected'
                setDesactivatedSelected(false)
            } else if (!desactivatedSelected) {
                e.target.className = 'selected'
                setDesactivatedSelected(true)
            }
        }
    }

    return (
        <>
            <div id="search-bar" className="flex align-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24"><path fill="#C5C3C3" d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"/></svg>
                <input onChange={(e) => { setSearchString(e.target.value) }} placeholder="Chercher un partenaire ou une structure par Nom"></input>
                <button onClick={() => { setSettingsWindowShown(true) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24"><path fill="#C5C3C3" d="M7,6H6V3A1,1,0,0,0,4,3V6H3A1,1,0,0,0,3,8H7A1,1,0,0,0,7,6ZM5,10a1,1,0,0,0-1,1V21a1,1,0,0,0,2,0V11A1,1,0,0,0,5,10Zm7,8a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V19A1,1,0,0,0,12,18Zm9-8H20V3a1,1,0,0,0-2,0v7H17a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Zm-2,4a1,1,0,0,0-1,1v6a1,1,0,0,0,2,0V15A1,1,0,0,0,19,14Zm-5,0H13V3a1,1,0,0,0-2,0V14H10a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Z"/></svg>
                </button>
            </div>
            {
                settingsWindowShown ?
                <Modal 
                    onClose={() => { setSettingsWindowShown(false) }}
                    content={
                        <div id="search-filters">
                            <h2>Filtrer la recherche</h2>
                            <label>Résultats actifs</label>
                            <div id="checkbox-actives" className="selected" onClick={(e) => { checkboxChangeManager('actives', e) }}></div>
                            <label>Résultats inactifs</label>
                            <div id="checkbox-inactives" className="selected" onClick={(e) => { checkboxChangeManager('inactives', e) }}></div>
                            <button onClick={() => { manageFilters(); setSettingsWindowShown(false) }}>Appliquer</button>
                        </div>
                    }
                />
                :
                null
            }
        </>
    )

}

export default Searchbar