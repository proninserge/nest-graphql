import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import * as process from "process";
import {join} from "path";
import { CoffeesModule } from './coffees/coffees.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import ormconfig from "../ormconfig";
import {DateScalar} from "./common/scalars/date.scalar";

@Module({
  imports: [
      TypeOrmModule.forRoot(ormconfig),
      GraphQLModule.forRoot<ApolloDriverConfig>({
          // buildSchemaOptions: {
          //     dateScalarMode: 'timestamp',
          //     // numberScalarMode: 'integer',
          // },
        driver: ApolloDriver,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // code first
      }),
      CoffeesModule,
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar],
})
export class AppModule {}
