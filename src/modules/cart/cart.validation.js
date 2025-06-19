import joi from "joi";




export const createAndAddToCartSchema = joi.object({
  body: joi.object({
    productId: joi.string().length(24).hex().required(),
    quantity: joi.number().integer().min(1).optional()
  }),
  params: joi.object().optional(),
  query: joi.object().optional()
}).required();


export const updateQuantityItemCartSchema = joi.object({
  params: joi.object({
    id: joi.string().length(24).hex().required()
  }),
  body: joi.object({
    productId: joi.string().length(24).hex().required(),
    quantity: joi.number().integer().min(0).required()
  }),
  query: joi.object().optional()
}).required();




export const removeItemFromCartSchema = joi.object({
  params: joi.object({
    id: joi.string().length(24).hex().required()
  }),
  body: joi.object({
    productId: joi.string().length(24).hex().required()
  }),
  query: joi.object().optional()
}).required();
