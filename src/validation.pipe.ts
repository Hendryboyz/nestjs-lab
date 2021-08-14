import {
    Injectable,
    PipeTransform,
    ArgumentMetadata,
    BadRequestException
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
    // why async transform: https://github.com/typestack/class-validator#custom-validation-classes
    async transform(value: any, metadata: ArgumentMetadata) {
        console.log(value, metadata.metatype);
        if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
            return value;
        }
        const object = plainToClass(metadata.metatype, value);
        const error = await validate(object);
        if (error.length > 0) {
            throw new BadRequestException('Validation failed');
        }
        return value;
    }

    private toValidate(metadata: Function): boolean {
        // validate is native JavaScript type or not
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metadata)
    }
}
