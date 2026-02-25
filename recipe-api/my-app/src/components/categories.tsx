import { useState, useEffect } from "react";
import "./categories.css";

interface CategoryFilterProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange}: CategoryFilterProps) {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        fetch("http://localhost:3500/recipes/recipeTypes")
        .then((res) => res.json())
        .then((data) => setCategories(data.map((item: any) => item.name)))
        .catch((err) => console.error("Failed to fetch categories", err));
    }, []);

    const allCategories = ["All", ...categories];

  return (
    <div className="category-filter">
      {allCategories.map((cat) => (
        <button
          key={cat}
          className={`category-btn ${selectedCategory === cat ? "selected" : ""}`}
          onClick={() => onCategoryChange(cat)}
        >
          {cat.toUpperCase()}
        </button>
      ))}
    </div>
  );
}