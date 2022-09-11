
// Ce composant est une miniature qui résume dans un petit block les infos
// de base d'un partenaire ou d'une structure
const PartenaireStructure = (props) => {

    return (
        <a href={`/partenaire/?id=${props.email}`} className="partenaire-structure-mini">
            <p id="name"><strong>{props.prenom} {props.nom}</strong></p>
            <p>{props.rue}</p>
            <p>{props.cpville}</p>
            <p>{props.email}</p>
            <div className="flex align-end gap10">
                <span className={props.status.toLowerCase()}></span>
                <p id="status">{props.status}</p>
            </div>
        </a>
    )

}

export default PartenaireStructure