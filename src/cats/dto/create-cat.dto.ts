import * as Joi from 'joi';
// https://github.com/typestack/class-validator#usage
import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreateCatDto {
    @IsString()
    name: string;
    @IsInt()
    @Min(1)
    @Max(20)
    age: number;
    @IsString()
    breed: string;
}

export const createCatSchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string(),
    age: Joi.number()
        .min(1)
        .max(20),
    breed: Joi.string(),
});