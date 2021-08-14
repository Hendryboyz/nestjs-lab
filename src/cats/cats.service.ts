import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

type findAllQuery = {
    activeOnly: boolean;
    page: number;
};

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    create(cat: Cat) {
        this.cats.push(cat);
    }

    findAll(query: findAllQuery): Cat[] {
        return this.cats;
    }
}
