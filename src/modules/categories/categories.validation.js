import joi from "joi";




export const createCategorySchema = joi.object({
    body: joi.object({
        name: joi.string().required().min(3).max(50),
        description: joi.string().required().min(5).max(200)
    }),
    params: joi.object().optional(),
    query: joi.object().optional()
}).required();

export const singleCategorySchema = joi.object({
    params: joi.object({
        id: joi.string().length(24).hex().required()
    }),
    body: joi.object().optional(),
    query: joi.object().optional()
}).required();

export const updateCategorySchema = joi.object({
    params: joi.object({
        id: joi.string().length(24).hex().required()
    }),
    body: joi.object({
        name: joi.string().min(3).max(50),
        description: joi.string().min(5).max(200)
    }),
    query: joi.object().optional()
}).required();


export const deleteCategorySchema = joi.object({
    params: joi.object({
        id: joi.string().length(24).hex().required()
    }),
    body: joi.object().optional(),
    query: joi.object().optional()
});
