import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {CoffeeEntity} from "./entities/coffee.entity";
import {FlavorEntity} from "./entities/flavor.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

// name of a relation
@Resolver(() => CoffeeEntity) // parent class
export class CoffeeFlavorsResolver {
    constructor(
        @InjectRepository(FlavorEntity) private readonly flavorsRepository: Repository<FlavorEntity>
    ) {}

    @ResolveField('flavors', () => [FlavorEntity])
    async getFlavorsOfCoffee(@Parent() coffee: CoffeeEntity) {
        return this.flavorsRepository
            .createQueryBuilder('flavor') // alias for specific query for flavor entity
            .innerJoin('flavor.coffees', 'coffees', 'coffees.id = :coffeeId', {
                coffeeId: coffee.id
            })
            .getMany() ;
    }
}
