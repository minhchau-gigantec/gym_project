const {ADMIN_ROLE} = require('../constants/constants')

module.exports = role_names => async(req, res, next) => {
    try{
        const {roles: user_roles} = req.user

        const permission = user_roles.filter(role => {
            let result = role_names.includes(role) || (role === ADMIN_ROLE)
            return result
        })

        if(permission.length > 0 || role_names.length == 0){
            return next()
        }

        return res.json({code: 403, message: 'Unauthorization', data: null})
    }catch(error){
        console.log(error)
        res.json({code: 403, message: "Unauthorization", data: null})
    }
}