import { Recipe } from '../types/types';
import './recipe.css';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  // convert image if it's binary from MongoDB
  const imageUrl = `data:image/png;base64,${recipe.image}`;

  return (
    <div className="recipe-card">
      <img src={imageUrl} alt={recipe.title} className="recipe-card-image" />
      <h2 className="recipe-card-title">{recipe.title}</h2>
    </div>
  );
}