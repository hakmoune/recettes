import { useState, useEffect } from "react";
import { Ingredients } from "./Ingredients/Ingredients";
import { NavBar } from "../UI/NavBar";
import { useIngredients } from "../Hooks/Ingredients";
import { Recipes } from "./Recipes/Recipes";
import { useRecipes } from "../Hooks/Recipes";
import { RecipeDetails } from "./Recipes/RecipeDetails";

export function Site() {
  const [page, setPage] = useState("recipes");

  //Call API
  useEffect(() => {
    if (page === "ingredients") {
      fetchIngredients();
    } else if (page === "recipes") {
      fetchRecipes();
    }
  }, [page]);

  //INGREDIENTS PROPS
  const {
    ingredients,
    fetchIngredients,
    deleteIngredient,
    updateIngredient,
    createIngredient
  } = useIngredients();

  //RECIEPES PROPS
  const {
    recipes,
    recipe,
    fetchRecipes,
    fetchRecipe,
    deleteRecipes,
    addRecipes,
    updateRecipes,
    deselectRecipe
  } = useRecipes();

  let content = null;
  if (page === "ingredients") {
    content = (
      <Ingredients
        ingredients={ingredients}
        onDelete={deleteIngredient}
        onUpdate={updateIngredient}
        onCreate={createIngredient}
      />
    );
  } else if (page === "recipes") {
    content = (
      <Recipes
        recipes={recipes}
        onClick={fetchRecipe}
        onDelete={deleteRecipes}
        onCreate={addRecipes}
        onUpdate={updateRecipes}
      />
    );
  }

  return (
    <div>
      <NavBar currentPage={page} onClick={setPage} />
      {recipe ? (
        <RecipeDetails recipe={recipe} onClose={deselectRecipe} />
      ) : null}
      {content}
    </div>
  );
}
