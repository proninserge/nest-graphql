import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {AuthService} from "../auth.service";
import {ExtractJwt, Strategy} from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { // fires when it sees username & pass in the req body (GqlAuthGuard)
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'hiding_string',
            logging: true,
        });
    }

    async validate(payload: any) { // decoded jwt
        return {userId: payload.id, username: payload.username}
    }
}