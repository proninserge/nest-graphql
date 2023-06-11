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
import {TeaEntity} from "./teas/entities/tea.entity";
import { DrinksModule } from './drinks/drinks.module';
import { PubSubModule } from './pub-sub/pub-sub.module';

@Module({
  imports: [
      TypeOrmModule.forRoot(ormconfig),
      GraphQLModule.forRoot<ApolloDriverConfig>({
          buildSchemaOptions: {
              orphanedTypes: [TeaEntity],
              // dateScalarMode: 'timestamp',
              // numberScalarMode: 'integer',
          },
        driver: ApolloDriver,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // code first
          installSubscriptionHandlers: true,
      }),
      CoffeesModule,
      DrinksModule,
      PubSubModule,
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar],
})
export class AppModule {}
