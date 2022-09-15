
// Ce composant est une miniature qui résume dans un petit block les infos
// de base d'un partenaire ou d'une structure
const PartenaireStructure = (props) => {

    let link = props.rights === 'full' ? 
        `/${props.type}/${props.email}`
        :
        `/${props.type}-notadmin/${props.email}`

    return (
        props.filter === 'both' ?
            <a href={link} className="partenaire-structure-mini">
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
        props.filter === 'activated' && props.status === 'actif' ?
            <a href={link} className="partenaire-structure-mini">
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
        props.filter === 'desactivated' && props.status === "inactif" ?
            <a href={link} className="partenaire-structure-mini">
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