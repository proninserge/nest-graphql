import {createUnionType} from "@nestjs/graphql";
import {CoffeeEntity} from "../../coffees/entities/coffee.entity";
import {TeaEntity} from "../../teas/entities/tea.entity";

export const DrinksResultUnion = createUnionType({
    name: 'DrinksResult',
    types: () => [CoffeeEntity, TeaEntity]
});
