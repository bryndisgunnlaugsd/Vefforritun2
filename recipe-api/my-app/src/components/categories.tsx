import { useState, useEffect } from "react";
import "./categories.css";

interface RecipeType {
  _id: string;
  name: string;
}

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const [categories, setCategories] = useState<RecipeType[]>([]);

  useEffect(() => {
    fetch("http://localhost:3500/recipes/recipeTypes")
      .then((res) => res.json())
      .then((data: RecipeType[]) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  return (
    <div className="category-filter">
      <button
        className={`category-btn ${selectedCategory === "All" ? "selected" : ""}`}
        onClick={() => onCategoryChange("All")}
      >
        ALL
      </button>
      {categories.map((cat) => (
        <button
          key={cat._id}
          className={`category-btn ${selectedCategory === cat._id ? "selected" : ""}`}
          onClick={() => onCategoryChange(cat._id)}
        >
          {cat.name.toUpperCase()}
        </button>
      ))}
    </div>
  );
}