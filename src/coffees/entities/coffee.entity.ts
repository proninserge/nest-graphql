import {Field, ID, ObjectType} from "@nestjs/graphql";
import {Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {FlavorEntity} from "./flavor.entity";

@Entity()
@ObjectType({description: 'Coffee model'})
export class CoffeeEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    @Field(() => String)
    name: string;

    @Column()
    @Field(() => String)
    brand: string;

    @JoinTable()
    @ManyToMany(
        type => FlavorEntity,
            flavor => flavor.coffees,
        {cascade: true}
    )
    @Field(() => [FlavorEntity])
    flavors?: FlavorEntity[];

    @CreateDateColumn() // auto creates date when Coffee inserted into the DB
    @Field(() => Date)
    createdAt?: Date;
}
