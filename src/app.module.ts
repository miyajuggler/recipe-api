import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from './recipes/recipes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './recipes/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), RecipesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
