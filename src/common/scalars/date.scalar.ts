import {CustomScalar, Scalar} from "@nestjs/graphql";
import {Kind, ValueNode} from "graphql/language";

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<number, Date> { // <from, to> client
    description = 'Date custom scalar type';

    parseValue(value: number): Date { // mutation input --> from client, from variables
        return new Date(value);
    }

    serialize(value: Date): number { // before response sent back to client
        console.log(`Serializing ${value}`);
        return value.getTime();
    }

    parseLiteral(ast: ValueNode): Date { // mutation input --> from client, from query
        if (ast.kind === Kind.INT) return new Date(ast.value);
        return null;
    }
}
