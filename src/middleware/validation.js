

const validation = (schema) => {

    return (req, res, next) => {

        const validationResult = schema.validate({ body: req.body , params: req.params , query: req.query }, { abortEarly: false })
        return validationResult.error ? next(validationResult.error) : next()
    }

}

export default validation