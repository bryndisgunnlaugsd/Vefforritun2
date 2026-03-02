import { Header } from '../components/header';
import { useEffect, useState } from 'react';
import { Recipe } from '../types/types';
import { RecipeCard } from '../components/recipe';
import { CategoryFilter } from '../components/categories';
import "./style.css"

export function Homepage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All")

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

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || recipe.recipeType === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <Header searchTerm={searchTerm} OnSearchChange={setSearchTerm} />

      <div style={{ backgroundColor: "#EDECF1", minHeight: "100vh", padding: "32px 0" }}>
        <div style={{ maxWidth: "1220px", margin: "0 auto", padding: "0 32px" }}>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {loading && <p>Loading recipes...</p>}
          {error && <p>{error}</p>}

          <div className="recipes-section">
            <p className="total-recipes">You have <span className="recipe-count">{recipes.length}</span> recipes to explore.</p>
            <div className="recipes-grid">
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe._id.toString()} recipe={recipe} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}