import { Module } from '@nestjs/common';
import {DrinksResolver} from "./drinks.resolver";
import {DrinksService} from "./drinks.service";
import {CoffeesModule} from "../coffees/coffees.module";

@Module({
    imports: [CoffeesModule],
    providers: [DrinksResolver, DrinksService],
})
export class DrinksModule {}
