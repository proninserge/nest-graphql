import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {CoffeeEntity} from "../coffees/entities/coffee.entity";
import {Repository} from "typeorm";
import {CoffeesService} from "../coffees/coffees.service";

@Injectable()
export class DrinksService {
    constructor(private readonly coffeesService: CoffeesService) {
    }
    async findAllDrinks() {
        const res = await this.coffeesService.findAll();
        return res;
    }
}
