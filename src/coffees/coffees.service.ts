import {Injectable} from '@nestjs/common';
import {CreateCoffeeDTO} from "./dto/create-coffee.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {CoffeeEntity} from "./entities/coffee.entity";
import {Repository} from "typeorm";
import {UserInputError} from "apollo-server-express";
import {UpdateCoffeeDTO} from "./dto/update-coffee.dto";
import {FlavorEntity} from "./entities/flavor.entity";

@Injectable()
export class CoffeesService {

    constructor(
        @InjectRepository(CoffeeEntity) private readonly coffeesRepository: Repository<CoffeeEntity>,
        @InjectRepository(FlavorEntity) private readonly flavorsRepository: Repository<FlavorEntity>
    ) {
    }

    async findAll() {
        return this.coffeesRepository.find();
    }

    async findOne(id: number) {
        const coffee = await this.coffeesRepository.findOne({
            where: {id}
        });
        if (!coffee) throw new UserInputError(`Coffee with #${id} does not exist`);
        return coffee;
    }

    async createCoffee(dto: CreateCoffeeDTO) {
        const flavors = await Promise.all(
            dto.flavors.map(f => this.preloadFlavorByName(f))
        );
        const coffee = this.coffeesRepository.create({
            ...dto,
            flavors
        });
        return this.coffeesRepository.save(coffee);
    }

    async updateCoffee(id: number, dto: UpdateCoffeeDTO) {
        const flavors = dto.flavors && (await Promise.all(
            dto.flavors.map(async f => await this.preloadFlavorByName(f))
        ));
        const coffee = await this.coffeesRepository.preload({
            id,
            ...dto,
            flavors
        });
        if (!coffee) throw new UserInputError(`Coffee with #${id} does not exist`);
        return this.coffeesRepository.save(coffee);
    }

    async removeCoffee(id: number) {
        const coffee = await this.findOne(id);
        return this.coffeesRepository.remove(coffee);
    }

    private async preloadFlavorByName(name: string): Promise<FlavorEntity> {
        const flavor = await this.flavorsRepository.findOne({
            where: {name}
        });
        if (flavor) return flavor;
        return this.flavorsRepository.create({name});
    }
}
