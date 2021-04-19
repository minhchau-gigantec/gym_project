const {env} = require('../configs/config.service')
const axios  = require('axios')
const mongo = require('../core/mongo')
const {v4: uuid} = require('uuid')


module.exports = async (req, res, next) => {
    try{
        const url = env.config.AUTH_DOMAIN + '/userinfo'
        const token = req.headers.authorization

        // console.log({token})
        const response = await axios.get(url,  { headers: { Authorization: token}})
        
        if(response.status !== 200) {
            return res.status(401).send({message: 'UnAuthentication'})
        }

        const user_auth = response.data
        const collection = mongo.db.collection('user_profiles')

        var user_profile = await collection.findOne({auth_id: user_auth.sub})

        if (!user_profile){
            const id = uuid() 
            await collection.insertOne({
                _id: id,
                email: user_auth.email,
                auth_id: user_auth.sub,
                is_answered: false
            })

            user_profile = await collection.findOne({auth_id: user_auth.sub})
        }
        // console.log({user_profile})

        req.user = user_profile
        return next()
    }catch(error){
        return res.status(401).send({message: 'UnAuthentication'})
    }

}