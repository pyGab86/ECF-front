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

    // Cette fonction permet de récupérer une nouvelle token grâce à la
    // refresh token. 
    refreshToken = async () => {

        const response = await axios.post(`${this.baseUrl}/api/auth/refreshtoken`, {
            uid: localStorage.getItem('email'),
            password: localStorage.getItem('password'),
            type: localStorage.getItem('utype')
        }, {
            headers: {
                'Authorization': `Basic ${localStorage.getItem('refresh')}`
            }
        })

        if (response.data.success) {
            localStorage.setItem('token', response.data.token)
            return true
        } else {
            console.log('Refresh token could not be refreshed!')
            window.location.replace('/login')
            return false
        }

    }

    // Une seule fonction pour récupérer la data. 
    // C'est le param requested qui spécifie les données souhaitées
    getData = async (requested, options=undefined) => {

        const response = await axios.post(`${this.baseUrl}/api/data`, {
            requested,
            uid: localStorage.getItem('email'),
            type: localStorage.getItem('utype'),
            options
        }, {
            headers: {
                'Authorization': `Basic ${localStorage.getItem('token')}`
            }
        })

        if (response.data.success) {
            return response
        } else {
            if (response.data.reason == "invalid token") {
                const refreshed = await this.refreshToken()

                if (refreshed) {
                    const response = await axios.post(`${this.baseUrl}/api/data`, {
                        requested,
                        uid: localStorage.getItem('email'),
                        type: localStorage.getItem('utype'),
                        options
                    }, {
                        headers: {
                            'Authorization': `Basic ${localStorage.getItem('token')}`
                        }
                    })

                    return response
                }
            }
        }
    }

    // Quand on performe une action sur le back, on passe toujours l'objet body
    // a cette fonction. Cela permet d'utiliser cette fonction pour toutes les interactions autres 
    // qu'écriture sur la bdd
    performAction = async (body) => {

        const response = await axios.post(`${this.baseUrl}/api/action`, body, {
            headers: {
                'Authorization': `Basic ${localStorage.getItem('token')}`
            }
        })

        if (response.data.success) {
            return response
        } else {
            if (response.data.reason == "invalid token") {
                const refreshed = await this.refreshToken()

                if (refreshed) {
                    const response = await axios.post(`${this.baseUrl}/api/action`, body, {
                        headers: {
                            'Authorization': `Basic ${localStorage.getItem('token')}`
                        }
                    })

                    return response
                }
            }
        }
    }
}

const back = new Back()
export default back