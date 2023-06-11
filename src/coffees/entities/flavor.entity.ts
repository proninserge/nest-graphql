import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Field, ID, ObjectType} from "@nestjs/graphql";
import {CoffeeEntity} from "./coffee.entity";

@Entity()
@ObjectType({description: 'Flavor model'})
export class FlavorEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    @Field(() => String)
    name: string;

    @ManyToMany(type => CoffeeEntity, coffee => coffee.flavors)
    coffees: CoffeeEntity[]
}
