import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Delete,
    Header,
    Param,
    ParseIntPipe,
    Query,
    UsePipes,
    ParseBoolPipe,
    DefaultValuePipe,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto, createCatSchema } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from './forbidden.exception';
import { spawn } from 'child_process';
import { HttpExceptionFilter } from '../http-exception.filter';
import { JoiValidationPipe } from '../common/pipes/joi-validation.pipe';
import { ValidationPipe } from '../common/pipes/validation.pipe';

@Controller('cats')
export class CatsController {
    constructor(private catService: CatsService) {}

    @Post()
    // @UseFilters(new HttpExceptionFilter())
    // @UsePipes(new JoiValidationPipe(createCatSchema))
    @Header('Cache-Control', 'none')
    async create(@Body() createCatDto: CreateCatDto): Promise<string> {
        console.log(createCatDto);
        this.catService.create(createCatDto);
        return 'This action adds a new cat.';
    }

    @Get()
    async findAll(
        @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean,
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number
    ): Promise<Cat[]> {
        return this.catService.findAll({ activeOnly, page });
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): string {
    // async findOne(@Query('id', ParseUUIDPipe) id: string): Promise<string>{
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

    @Delete()
    async removeAll() {
        const ls = spawn('ls', ['-al', '.']);
        ls.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
        ls.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
        // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        throw new ForbiddenException();
    }
}