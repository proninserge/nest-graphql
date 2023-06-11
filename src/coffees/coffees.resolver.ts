import {Args, ID, Mutation, Query, Resolver} from '@nestjs/graphql';
import {CoffeeEntity} from "./entities/coffee.entity";
import {ParseIntPipe} from "@nestjs/common";
import {CreateCoffeeDTO} from "./dto/create-coffee.dto";
import {CoffeesService} from "./coffees.service";
import {UpdateCoffeeDTO} from "./dto/update-coffee.dto";

@Resolver()
export class CoffeesResolver {

    constructor(private readonly coffeesService: CoffeesService) {
    }
    @Query(() => [CoffeeEntity], {name: 'coffees'})
    async findAll() {
        return this.coffeesService.findAll();
    }

    @Query(() => CoffeeEntity, {name: 'coffee'})
    async findOne(@Args('id', {type: () => ID}, ParseIntPipe) id: number) {
        return this.coffeesService.findOne(id);
    }

    @Mutation(() => CoffeeEntity, {name: 'createCoffee'})
    async create(@Args('createCoffeeDTO') dto: CreateCoffeeDTO) {
        return this.coffeesService.createCoffee(dto);
    }

    @Mutation(() => CoffeeEntity, {name: 'updateCoffee'})
    async update(
        @Args('id', ParseIntPipe) id: number,
        @Args('updateCoffeeDTO') dto: UpdateCoffeeDTO
    ) {
        return this.coffeesService.updateCoffee(id, dto);
    }

    @Mutation(() => CoffeeEntity, {name: 'removeCoffee'})
    async remove(
        @Args('id', ParseIntPipe) id: number,
    ) {
        return this.coffeesService.removeCoffee(id);
    }
}
