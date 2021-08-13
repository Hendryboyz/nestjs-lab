import * as Joi from 'joi';

export class CreateCatDto {
    name: string;
    age: number;
    breed: string;
}

export const createCatSchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string(),
    age: Joi.number()
        .min(1)
        .max(20),
    breed: Joi.string(),
});