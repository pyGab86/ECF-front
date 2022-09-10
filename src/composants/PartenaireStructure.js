

const PartenaireStructure = (props) => {

    return (
        <div className="partenaire-structure-mini">
            <p id="name"><strong>{props.prenom} {props.nom}</strong></p>
            <p>{props.rue}</p>
            <p>{props.cpville}</p>
            <p>{props.email}</p>
            <p id="status">{props.status}</p>
        </div>
    )

}

export default PartenaireStructure