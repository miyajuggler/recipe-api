import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RecipeDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  making_time: string;

  @Expose()
  serves: string;

  @Expose()
  ingredients: string;

  @Expose()
  cost: number;
}
