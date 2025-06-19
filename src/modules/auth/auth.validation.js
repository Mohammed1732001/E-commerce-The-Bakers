import joi from "joi";



export const signUpSchema = joi.object({
    body: joi.object({
        fullName: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required().pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ), // يحتوي على الاقل على حرف كابيتال وحرف اسمول وارقام وعلامات وميقلش عن 8,
        cPassword: joi.string().valid(joi.ref("password")).required(),
        phone: joi.string().required().pattern(/^01[0125][0-9]{8}$/),
    }),
    params: joi.object().optional(),
    query: joi.object().optional()
}).required();

export const loginSchema = joi.object({
    body: joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    }),
    params: joi.object().optional(),
    query: joi.object().optional()
}).required();
