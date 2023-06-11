import {InputType, PartialType} from "@nestjs/graphql";
import {CreateCoffeeDTO} from "./create-coffee.dto";

@InputType({description: 'Object to update Coffee'})
export class UpdateCoffeeDTO extends PartialType(CreateCoffeeDTO) {}
