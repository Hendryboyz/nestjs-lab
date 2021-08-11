import {
    Controller,
    Get,
    Query,
    Post,
    Body,
    Put,
    Delete,
    Req,
    Header,
    Param,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto, UpdateCatDto } from './dto';

@Controller('cats')
export class CatsController {
    @Post()
    @Header('Cache-Control', 'none')
    async create(@Body() createCatDto: CreateCatDto): Promise<string> {
        console.log(createCatDto);
        return 'This action adds a new cat.';
    }

    @Get()
    findAll(@Req() request: Request): string {
        return `This action returns all cats. (limit ${request.query.limit} items)`;
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        console.log();
        return `This action returns the #${id} cat.`;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
        return `This action updates the #${id} cat.`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes the #${id} cat.`
    }
}