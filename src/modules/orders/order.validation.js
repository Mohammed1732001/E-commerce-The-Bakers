import joi from "joi";


export const singleOrderSchema = joi.object({
    params: joi.object({
        id: joi.string().length(24).hex().required()
    }),
    body: joi.object().optional(),
    query: joi.object().optional()
}).required();