import joi from "joi";

export const createProductSchema = joi.object({
    body: joi.object({

        name: joi.string().min(2).max(100).required(),
        description: joi.string().min(5).max(1000).required(),
        price: joi.number().min(0).required(),
        category: joi.string().length(24).hex().required()
    }),
    params: joi.object().optional(),
    query: joi.object().optional()
});

export const updateProductSchema = joi.object({
    params: joi.object({
        id: joi.string().length(24).hex().required()
    }),
    body: joi.object({
        name: joi.string().min(2).max(100).required(),
        description: joi.string().min(5).max(1000).required(),
        price: joi.number().min(0).required()
    }),
    query: joi.object().optional()
});

export const productIdSchema = joi.object({
    params: joi.object({
        id: joi.string().length(24).hex().required()
    }),
    query: joi.object().optional(),
    body: joi.object().optional()
});
