export class CreateRecipeDto {
  id: number;
  title: string;
  making_time: string;
  serves: string;
  ingredients: string;
  cost: number;
  created_at: Date;
  updated_at: Date;
}
