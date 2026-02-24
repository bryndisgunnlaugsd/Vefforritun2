import { Recipe, RecipeType } from "../types/types";

export async function getRecipes(): Promise<Recipe[]> {
  const response = await fetch('http://localhost:3500/recipes');
  if (!response.ok) throw new Error('Failed to fetch recipes');
  return response.json();
}

export async function getRecipeById(id: string): Promise<Recipe> {
  const response = await fetch(`http://localhost:3500/recipes/${id}`);
  if (!response.ok) throw new Error('Failed to fetch recipe');
  return response.json();
}

export async function getRecipeTypes(): Promise<RecipeType[]> {
  const response = await fetch('http://localhost:3500/recipes/recipeTypes');
  if (!response.ok) throw new Error('Failed to fetch recipe types');
  return response.json();
}