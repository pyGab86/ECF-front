import axios from 'axios'

class Back {

    constructor () {
        this.baseUrl = 'http://localhost:3001'
    }

    // Utilisée pour se connecter
    login = async (email, password) => {

        return await axios.post(`${this.baseUrl}/api/auth/login`, {
            email,
            password
        })
    }

    // Une seule fonction pour récupérer la data. 
    // C'est le param requested qui spécifie les données souhaitées
    getData = async (requested) => {

        return await axios.post(`${this.baseUrl}/api/data`, {
            requested,
            uid: localStorage.getItem('email'),
            type: localStorage.getItem('utype')
        }, {
            headers: {
                'Authorization': `Basic ${localStorage.getItem('token')}`
            }
        })
    }

    // Quand on performe une action sur le back, on passe toujours l'objet body
    // a cette fonction. Cela permet d'utiliser cette fonction pour toutes les interactions autres 
    // qu'écriture sur la bdd
    performAction = async (body) => {

        return await axios.post(`${this.baseUrl}/api/action`, body, {
            headers: {
                'Authorization': `Basic ${localStorage.getItem('token')}`
            }
        })

    }
}

const back = new Back()
export default back