import {Query, Resolver} from '@nestjs/graphql';
import {DrinksService} from "./drinks.service";
import {DrinksResultUnion} from "../common/unions/drinks-result.union";

@Resolver()
export class DrinksResolver {
    constructor(private readonly drinksService: DrinksService) {
    }
    @Query(() => [DrinksResultUnion], {name: 'drinks'})
    async findAll(): Promise<typeof DrinksResultUnion[]> {
        return this.drinksService.findAllDrinks();
    }
}
