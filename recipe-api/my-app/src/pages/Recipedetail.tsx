import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById } from '../services/recipeservice';
import { Recipe, Instruction } from '../types/types';
import './recipedetail.css';

export function Recipedetail() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!recipeId) return;
    getRecipeById(recipeId)
      .then((data) => {
        console.log('Recipe data:', data);
        setRecipe(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Something went wrong fetching the recipe.');
        setLoading(false);
      });
  }, [recipeId]);

  if (loading) return <p className="detail-loading">Loading recipe...</p>;
  if (error || !recipe) return <p className="detail-error">{error ?? 'Recipe not found.'}</p>;

  const imageUrl = `data:image/png;base64,${recipe.image}`;

  const allTags = recipe.tags as any[];
  const calories = allTags.find(t => t.key === 'Calories')?.value;
  const totalMinutes = allTags.find(t => t.key === 'TotalMinutes')?.value;
  const activeTags = allTags.filter(t => ['Meat','Chicken','Fish','Spicy','KidFriendly'].includes(t.key) && t.value === true);

  return (
    <div>
      <button className="detail-back-btn" onClick={() => navigate('/')}>
        ← Back
      </button>

      <img src={imageUrl} alt={recipe.title} className="detail-cover-image" />

      <div className="detail-content">
        <h1 className="detail-title">{recipe.title}</h1>
        <p className="detail-author">By {recipe.author}</p>

        <div className="detail-stats">
          <div className="detail-stat-box">
            <p className="detail-stat-label">Calories</p>
            <p className="detail-stat-value">{calories} cal</p>
          </div>
          <div className="detail-stat-box">
            <p className="detail-stat-label">Total time</p>
            <p className="detail-stat-value">{totalMinutes} min</p>
          </div>
        </div>

        <h2 className="detail-section-title">About recipe</h2>
        <p className="detail-description">{recipe.description}</p>

        <h2 className="detail-section-title">Ingredients</h2>
        <ul className="detail-ingredients-list">
          {recipe.ingredients.map((ingredient, index) => {
            const displayName = ingredient.name ?? ingredient.ingredient ?? '';
            const displayAmount = ingredient.amount ?? ingredient.quantity ?? '';
            const displayUnit = ingredient.unit ?? '';
            return (
              <li key={index}>
                <span className="detail-ingredient-amount">{displayAmount} {displayUnit}</span>
                <span>{displayName}</span>
              </li>
            );
          })}
        </ul>

        <h2 className="detail-section-title">Instructions</h2>
        <ol className="detail-instructions-list">
          {recipe.instructions.map((instruction: Instruction) => (
            <li key={instruction.step}>{instruction.description}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}