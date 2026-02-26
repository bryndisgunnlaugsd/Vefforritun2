import { useNavigate } from 'react-router-dom';
import { Recipe, Tag } from '../types/types';
import './recipe.css';

interface RecipeCardProps {
  recipe: Recipe;
}

const tagEmojis: Record<string, string> = {
  Spicy: '🌶️',
  Fish: '🐟',
  Chicken: '🍗',
  Meat: '🥩',
  KidFriendly: '👶',
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  const navigate = useNavigate();
  const imageUrl = `data:image/png;base64,${recipe.image}`;
  const activeTags = recipe.tags.filter((tag: Tag) => tag.value === true);

  return (
    <div
      className="recipe-card"
      onClick={() => navigate(`/recipes/${recipe._id}`)}
      style={{ cursor: 'pointer' }}
    >
      <img src={imageUrl} alt={recipe.title} className="recipe-card-image" />
      <h2 className="recipe-card-title">{recipe.title}</h2>
      <div className="recipe-card-tags">
        {activeTags.map((tag: Tag) => (
          <span key={tag.key}>{tagEmojis[tag.key]}</span>
        ))}
      </div>
    </div>
  );
}