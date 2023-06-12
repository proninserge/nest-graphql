import {Field, ObjectType} from "@nestjs/graphql";
import {User} from "../../users/entities/user.entity";

@ObjectType()
export class LoginResponseDTO {
    @Field()
    access_token: string;

    @Field(() => User)
    user: User;
}