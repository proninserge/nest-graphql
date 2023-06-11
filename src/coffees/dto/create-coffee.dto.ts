import {Field, InputType} from "@nestjs/graphql";
import {MinLength} from "class-validator";
import {CoffeeType} from "../../common/enums/coffee-type.enum";

@InputType({description: 'Object to create Coffee'})
export class CreateCoffeeDTO {
    @MinLength(3)
    @Field(() => String, {description: 'Name of a Coffee'})
    name: string;

    @Field(() => String)
    brand: string;

    @Field(() => [String])
    flavors: string[];

    @Field(() => CoffeeType)
    type: CoffeeType;
}
