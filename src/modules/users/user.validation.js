import Joi from "joi";

export const singleUserSchema = Joi.object({
    params: Joi.object({
        id: Joi.string().length(24).hex().required()
    }).required(),

    body: Joi.object().unknown(true),
    query: Joi.object().unknown(true)
});


export const updateUserSchema = Joi.object({
    params: Joi.object({
        id: Joi.string().length(24).hex().required()
    }),
    body: Joi.object({
        role: Joi.string().valid("user", "admin").required()
    }),
    query: Joi.object().unknown(true)
});

export const updateActiveSchema = Joi.object({
    params: Joi.object({
        id: Joi.string().length(24).hex().required()
    }),
    body: Joi.object().max(0),
    query: Joi.object().max(0)
});


export const updateMyProfileSchema = Joi.object({
    params: Joi.object().max(0),
    query: Joi.object().max(0),
    body: Joi.object({
        fullName: Joi.string().min(3).max(50).required(),
        phone: Joi.string().pattern(/^01[0125][0-9]{8}$/).required()
    })
});

export const updatePasswordSchema = Joi.object({
    params: Joi.object().max(0),
    query: Joi.object().max(0),
    body: Joi.object({
        oldPassword: Joi.string().required(),
        password: Joi.string()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
        cPassword: Joi.any().valid(Joi.ref("password")).required()
    })
});

export const deleteUserSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().length(24).hex().required()
  }),
  body: Joi.object().max(0),
  query: Joi.object().max(0)
});

