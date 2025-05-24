import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import Recipes from './entities/recipe.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipes)
    private readonly recipesRepository: Repository<Recipes>,
  ) {}
  async create(createRecipeDto: CreateRecipeDto) {
    const createRecipe: CreateRecipeDto = {
      id: 111,
      title: createRecipeDto.title,
      making_time: createRecipeDto.making_time,
      serves: createRecipeDto.serves,
      ingredients: createRecipeDto.ingredients,
      cost: createRecipeDto.cost,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const recipe = await this.recipesRepository.save(createRecipe);
    return recipe;
  }

  async findAll() {
    return await this.recipesRepository.find();
  }

  async findOne(id: number) {
    return await this.recipesRepository.findOneBy({ id });
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    const updateRecipe: UpdateRecipeDto = {
      id: id,
      title: updateRecipeDto.title,
      making_time: updateRecipeDto.making_time,
      serves: updateRecipeDto.serves,
      ingredients: updateRecipeDto.ingredients,
      cost: updateRecipeDto.cost,
      created_at: new Date(),
      updated_at: new Date(),
    };
    await this.recipesRepository.update(id, updateRecipe);
    return this.findOne(id);
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      await this.recipesRepository.delete(id);
      return { message: 'Recipe successfully removed!' };
    } catch {
      return { message: 'No Recipe found' };
    }
  }
}
