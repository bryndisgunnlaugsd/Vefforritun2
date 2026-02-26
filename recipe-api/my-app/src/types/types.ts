export interface Tag {
  key: string;
  value: boolean | number;
}

export interface Ingredient {
  name?: string;
  ingredient?: string;
  amount?: string;
  quantity?: string;
  unit?: string;
}

export interface Instruction {
  step: number;
  description: string;
}

export interface Recipe {
  _id: string;
  title: string;
  image: string;
  recipeType: string;
  tags: Tag[];
  author: string;
  calories: number;
  totalMinutes: number;
  description: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
}

export interface RecipeType {
  name: string;
}