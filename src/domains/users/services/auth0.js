const {env} = require('../../../configs/config.service')
const axios = require('axios')


const get_token = () => new Promise(async (resolve, reject) => {
    try{
        const {
            AUTH_DOMAIN, AUTH_CLIENT_ID, AUTH_CLIENT_SECRET
        } = env.config

        const TOKEN_URL = `${AUTH_DOMAIN}/oauth/token`

        const response = await axios.post(TOKEN_URL, {
            client_id: AUTH_CLIENT_ID,
            client_secret: AUTH_CLIENT_SECRET,
            audience: `${AUTH_DOMAIN}/api/v2/`,
            grant_type: "client_credentials"
        })
        if(response.status != 200){
            return reject('get token from auth0 failure')
        }
        const {access_token} = response.data
        return resolve(access_token)
    }catch(error){
        console.log(error)
        return reject(error)
    }
})

const get_role = (user_id) => new Promise(async (resolve, reject) => {
    try{
        const {AUTH_DOMAIN} = env.config
        const ROLE_URL = `${AUTH_DOMAIN}/api/v2/users/${user_id}/roles`
    
        const accesss_token = await get_token()
    
        const response = await axios.get(ROLE_URL, {
            headers: {Authorization: `Bearer ${accesss_token}`}
        })
    
        if(response.status != 200){
            return reject('get role follow user failure')
        }
        
        const role_list = response.data
        const role_names = role_list.map(role => role.name)
        return resolve(role_names)
    }catch(error){
        console.log(error)
        return reject(error)
    }

    
})

module.exports = {
    get_token,
    get_role
}