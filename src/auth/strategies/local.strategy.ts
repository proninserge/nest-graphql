import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) { // fires when it sees username & pass in the req body (GqlAuthGuard)
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string) {
        const user = await this.authService.validate(username, password);
        if (!user) throw new UnauthorizedException('Unauthorized');
        return user;
    }
}