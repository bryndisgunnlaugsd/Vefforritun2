import { Header } from '../components/header';
import { useEffect, useState } from 'react';
import { Recipe } from '../types/types';
import { RecipeCard } from '../components/recipe';
import "./style.css"

export function Homepage() {
  const [searchTerm, setSearchTerm] = useState("")
  const[recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


    useEffect(() => {
      fetch('http://localhost:3500/recipes')
        .then(res => res.json())
        .then(data => {
          setRecipes(data);
          setLoading(false);
        })
        .catch(err => {
          setError('Something went wrong fetching recipes');
          setLoading(false);
        });
    }, []);

    const filteredRecipes = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <Header searchTerm={searchTerm} OnSearchChange={setSearchTerm} />

      {loading && <p>Loading recipes...</p>}
      {error && <p>{error}</p>}

      <div className="recipes-grid">
        {filteredRecipes.map(recipe => (
          <RecipeCard key={recipe._id.toString()} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}