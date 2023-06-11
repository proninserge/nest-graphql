import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {CoffeeEntity} from "./entities/coffee.entity";
import {FlavorEntity} from "./entities/flavor.entity";
import {FlavorsByCoffeeLoader} from "./data-loader/flavors-by-coffee.loader";

// name of a relation
@Resolver(() => CoffeeEntity) // parent class
export class CoffeeFlavorsResolver {
    constructor(
        private readonly flavorsByCoffeeLoader: FlavorsByCoffeeLoader
    ) {}

    @ResolveField('flavors', () => [FlavorEntity])
    async getFlavorsOfCoffee(@Parent() coffee: CoffeeEntity) {
        return this.flavorsByCoffeeLoader.load(coffee.id);
    }
}
