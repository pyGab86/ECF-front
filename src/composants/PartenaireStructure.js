
// Ce composant est une miniature qui résume dans un petit block les infos
// de base d'un partenaire ou d'une structure
const PartenaireStructure = (props) => {

    return (
        props.filter === 'both' ?
            <a href={`/${props.type}/${props.email}`} className="partenaire-structure-mini">
                <p id="name"><strong>{props.prenom} {props.nom}</strong></p>
                <p>{props.rue}</p>
                <p>{props.cpville}</p>
                <p>{props.email}</p>
                <div className="flex align-end gap10">
                    <span className={props.status.toLowerCase()}></span>
                    <p id="status">{props.status}</p>
                </div>
            </a>
        :
        props.filter === 'activated' && props.status === 'Actif' ?
            <a href={`/${props.type}/${props.email}`} className="partenaire-structure-mini">
                <p id="name"><strong>{props.prenom} {props.nom}</strong></p>
                <p>{props.rue}</p>
                <p>{props.cpville}</p>
                <p>{props.email}</p>
                <div className="flex align-end gap10">
                    <span className={props.status.toLowerCase()}></span>
                    <p id="status">{props.status}</p>
                </div>
            </a>
        :
        props.filter === 'desactivated' && props.status === "Inactif" ?
            <a href={`/${props.type}/${props.email}`} className="partenaire-structure-mini">
                <p id="name"><strong>{props.prenom} {props.nom}</strong></p>
                <p>{props.rue}</p>
                <p>{props.cpville}</p>
                <p>{props.email}</p>
                <div className="flex align-end gap10">
                    <span className={props.status.toLowerCase()}></span>
                    <p id="status">{props.status}</p>
                </div>
            </a>
        :
        null
    )

}

export default PartenaireStructure