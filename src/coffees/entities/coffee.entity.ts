import {Field, ID, ObjectType} from "@nestjs/graphql";
import {Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {FlavorEntity} from "./flavor.entity";
import {Drink} from "../../common/interfaces/drink.interface";
import {CoffeeType} from "../../common/enums/coffee-type.enum";
import {loggerMiddleware} from "../../common/middlewares/logger.middleware";

@Entity()
@ObjectType({description: 'Coffee model', implements: () => Drink})
export class CoffeeEntity implements Drink {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    @Field(() => String, {middleware: [loggerMiddleware]}) // whenever request a field, middleware works
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

    @Column({nullable: true})
    @Field(() => CoffeeType)
    type: CoffeeType;
}
