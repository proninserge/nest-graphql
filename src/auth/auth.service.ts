import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {User} from "../users/entities/user.entity";
import {JwtService} from "@nestjs/jwt";
import {LoginInputDTO} from "./dto/login-input.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {
    }

    async validate(username: string, password: string) {
        const user = await this.usersService.findOne(username);
        const isValid = await bcrypt.compare(password, user?.password);
        if (!user) return null;
        if (user.password === password || isValid) {
            const {password, ...result} = user;
            return result;
        }
    }

    async login(user: User) {
        return {
            access_token: this.jwtService.sign({username: user.username, id: user.id}),
            user
        }
    }

    async signup(inputDTO: LoginInputDTO) {
        const user = await this.usersService.findOne(inputDTO.username);
        if (user) throw new HttpException('This user already exists', HttpStatus.CONFLICT);
        const hashedPassword = await bcrypt.hash(inputDTO.password, 10);
        return this.usersService.create({...inputDTO, password: hashedPassword});
    }
}
