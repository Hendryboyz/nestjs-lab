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
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
    constructor(private catService: CatsService) {}

    @Post()
    @Header('Cache-Control', 'none')
    async create(@Body() createCatDto: CreateCatDto): Promise<string> {
        console.log(createCatDto);
        this.catService.create(createCatDto);
        return 'This action adds a new cat.';
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catService.findAll();
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