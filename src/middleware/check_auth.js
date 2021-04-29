const {env} = require('../configs/config.service')
const axios  = require('axios')
const mongo = require('../core/mongo')
const {v4: uuid} = require('uuid')
const auth0 = require('../domains/users/services/auth0')
const user_profile = require('../domains/users/services/user_profile')
 


module.exports = async (req, res, next) => {
    try{
        const url = env.config.AUTH_DOMAIN + '/userinfo'
        const token = req.headers.authorization

        const response = await axios.get(url,  { headers: { Authorization: token}})
        
        if(response.status !== 200) {
            return res.status(401).send({message: 'UnAuthentication'})
        }

        const user_auth = response.data
        const collection = mongo.db.collection('user_profiles')

        var user = await collection.findOne({auth_id: user_auth.sub})

        if (!user){
            user = await user_profile.create_one(user_auth)
        }

        const roles = await auth0.get_role(user_auth.sub)

        user_profile.roles = roles

        req.user = user
        return next()
    }catch(error){
        console.log(error)
        return res.status(401).send({message: 'UnAuthentication'})
    }

}