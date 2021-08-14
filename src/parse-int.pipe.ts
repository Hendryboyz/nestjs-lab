import { ArgumentMetadata, PipeTransform, BadRequestException } from '@nestjs/common';

export class ParseIntPipe implements PipeTransform<string, number> {
    transform(value: string, metadata: ArgumentMetadata): number {
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            throw new BadRequestException('Validation failed');
        }
        return val;
    }

}
