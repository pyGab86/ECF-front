
const SearchResult = (props) => {

    return (
        <div className="result-container">
            <a href={props.link}>
                <p><strong>{props.nom}</strong></p>
                <p>{props.email}</p>
            </a>
        </div>
    )

}

export default SearchResult