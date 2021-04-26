const Ajv = require('ajv')
const addFormats = require('ajv-formats')

module.exports = (schema, type = 'body') => async(req, res, next) => {
    try {
        // validate req.body || req.query || req.params
        const ajv = new Ajv({
            strict: false,
            allowUnionTypes: true,
            removeAdditional: true,
            userDefaults: true,
            coerceTypes: true,
            allErrors: true,
            verbose: true
        })

        addFormats(ajv)

        const valid = ajv.addSchema(schema, 'bodySchema').validate('bodySchema', req[type])

        if (!valid) {
            return res.json({
                code: 400,
                message: 'validation error',
                data: null
            })
        }
        return next()

    } catch (error) {
        console.log({ error })
        res.json({
            code: 400,
            message: 'validation error',
            data: null
        })
    }
}