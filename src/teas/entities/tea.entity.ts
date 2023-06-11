import {Field, ObjectType} from "@nestjs/graphql";
import {Drink} from "../../common/interfaces/drink.interface";
import {Column} from "typeorm";

@ObjectType({description: 'Tea model', implements: () => Drink})
export class TeaEntity implements Drink {
    @Column()
    @Field(() => String)
    name: string;
}
