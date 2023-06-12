import {Args, Context, Mutation, Resolver} from '@nestjs/graphql';
import {AuthService} from "./auth.service";
import {LoginResponseDTO} from "./dto/login-response.dto";
import {LoginInputDTO} from "./dto/login-input.dto";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "./guards/gql-auth.guard";
import {User} from "../users/entities/user.entity";

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {
    }

    @Mutation(() => LoginResponseDTO, {name: 'login'})
    @UseGuards(GqlAuthGuard)
    async loginIntoSystem(
        @Args('inputDTO') inputDTO: LoginInputDTO,
        @Context() context
    ) {
        return this.authService.login(context.user);
    }

    @Mutation(() => User, {name: 'signup'})
    async signUpInSystem(
        @Args('inputDTO') inputDTO: LoginInputDTO,
    ) {
        return this.authService.signup(inputDTO);
    }
}
