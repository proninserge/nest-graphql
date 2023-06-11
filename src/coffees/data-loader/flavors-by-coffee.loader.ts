import {Injectable, Scope} from '@nestjs/common';
import {FlavorEntity} from "../entities/flavor.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CoffeeEntity} from "../entities/coffee.entity";
import {In, Repository} from "typeorm";
import DataLoader from "dataloader";

@Injectable({scope: Scope.REQUEST})
export class FlavorsByCoffeeLoader { // coffeeId

    private loader: DataLoader<number, FlavorEntity[]>
    constructor(
        @InjectRepository(CoffeeEntity) private readonly coffeesRepository: Repository<CoffeeEntity>
    ) {
        this.loader = new DataLoader(keys => this.batchLoadFn(keys));
    }

    private async batchLoadFn(
        coffeeIds: readonly number[]
    ): Promise<FlavorEntity[][]> {
        const coffeesWithFlavors = await this.coffeesRepository.find({
            select: ['id'],
            relations: {
                flavors: true,
            },
            where: {
                id: In(coffeeIds as number[]),
            }
        });
        return coffeesWithFlavors.map(coffee => coffee.flavors);
    }

    async load(key: number): Promise<FlavorEntity[]> {
        return this.loader.load(key);
    }
}
