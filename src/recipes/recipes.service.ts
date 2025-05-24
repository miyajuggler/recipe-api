import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import Recipes from './entities/recipe.entity';
import { plainToInstance } from 'class-transformer';
import { RecipeDto } from './dto/recipes.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipes)
    private readonly recipesRepository: Repository<Recipes>,
  ) {}
  async create(createRecipeDto: CreateRecipeDto) {
    if (
      createRecipeDto.title &&
      createRecipeDto.making_time &&
      createRecipeDto.serves &&
      createRecipeDto.ingredients &&
      createRecipeDto.cost
    ) {
      const createRecipe: CreateRecipeDto = {
        title: createRecipeDto.title,
        making_time: createRecipeDto.making_time,
        serves: createRecipeDto.serves,
        ingredients: createRecipeDto.ingredients,
        cost: createRecipeDto.cost,
        created_at: new Date(),
        updated_at: new Date(),
      };
      const recipe = await this.recipesRepository.save(createRecipe);
      return {
        message: 'Recipe successfully created!',
        recipes: recipe,
      };
    } else {
      return {
        message: 'Recipe creation failed!',
        required: 'title, making_time, serves, ingredients, cost',
      };
    }
  }

  async findAll() {
    const recipes: Recipes[] = await this.recipesRepository.find();
    return { recipes: plainToInstance(RecipeDto, recipes) };
  }

  async findOne(id: number) {
    const recipe: Recipes | null = await this.recipesRepository.findOneBy({
      id,
    });
    if (recipe === null) return;
    return {
      message: 'Recipe details by id',
      recipes: [plainToInstance(RecipeDto, recipe)],
    };
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    const updateRecipe: UpdateRecipeDto = {
      title: updateRecipeDto.title,
      making_time: updateRecipeDto.making_time,
      serves: updateRecipeDto.serves,
      ingredients: updateRecipeDto.ingredients,
      cost: updateRecipeDto.cost,
      created_at: new Date(),
      updated_at: new Date(),
    };
    await this.recipesRepository.update(id, updateRecipe);
    const recipe = this.findOne(id);
    return {
      message: 'Recipe successfully updated!',
      recipes: [plainToInstance(RecipeDto, recipe)],
    };
  }

  async remove(id: number) {
    const removeRecipe = await this.findOne(id);
    if (removeRecipe) {
      await this.recipesRepository.delete(id);
      return { message: 'Recipe successfully removed!' };
    } else {
      return { message: 'No Recipe found' };
    }
  }
}
