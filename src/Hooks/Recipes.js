import { useReducer, useCallback } from "react";

function reducer(state, action) {
  console.log("RECIPES_REDUCER", action.type, action);

  switch (action.type) {
    case "FETCHING_INGREDIENTS":
      return { ...state, loading: true };
    case "SET_RECEIPES":
      return { ...state, recipes: action.payload, loading: false };
    case "FETCHING_RECIPE":
      return { ...state, recipeId: action.payload.id };
    case "SET_RECEIPE":
      return {
        ...state,
        recipes: state.recipes.map(recipe =>
          recipe.id === action.payload.id ? action.payload : recipe
        )
      };
    case "DESELECT_RECIPE":
      return { ...state, recipeId: null };
    case "DELETE_RECEIPES":
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe !== action.payload)
      };
    case "ADD_RECEIPES":
      return { ...state, recipes: [action.payload, ...state.recipes] };
    case "UPDATE_RECEIPES":
      return {
        ...state,
        recipes: state.recipes.map(recipe =>
          recipe === action.target ? action.payload : recipe
        )
      };
  }
}

export function useRecipes() {
  const [state, dispatch] = useReducer(reducer, {
    recipes: null,
    loading: false,
    recipeId: null
  });

  const recipe = state.recipes
    ? state.recipes.find(r => r.id === state.recipeId)
    : null;

  return {
    recipes: state.recipes,
    recipe: recipe,
    fetchRecipes: function() {
      if (state.loading || state.recipes !== null) {
        return;
      }
      dispatch({ type: "FETCHING_INGREDIENTS" });
      fetch("https://dummyjson.com/comments")
        .then(res => res.json())
        .then(({ comments }) =>
          dispatch({ type: "SET_RECEIPES", payload: comments })
        );
    },
    fetchRecipe: useCallback(function(recipe) {
      dispatch({ type: "FETCHING_RECIPE", payload: recipe });
      if (!recipe.body) {
        fetch("https://dummyjson.com/comments/" + recipe.id)
          .then(res => res.json())
          .then(data => dispatch({ type: "SET_RECEIPE", payload: data }));
      }
    }, []),
    deselectRecipe: function() {
      dispatch({ type: "DESELECT_RECIPE" });
    },
    deleteRecipes: function(recipe) {
      fetch("https://dummyjson.com/comments/" + recipe.id, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(
          data =>
            data.isDeleted &&
            dispatch({ type: "DELETE_RECEIPES", payload: recipe })
        );
    },
    addRecipes: function(dataForm) {
      fetch("https://dummyjson.com/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: dataForm.get("body"),
          postId: 3,
          userId: 5
        })
      })
        .then(res => res.json())
        .then(data => dispatch({ type: "ADD_RECEIPES", payload: data }));
    },
    updateRecipes: function(recipe, dataForm) {
      fetch("https://dummyjson.com/comments/" + recipe.id, {
        method: "PUT" /* or PATCH */,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: dataForm.get("body")
        })
      })
        .then(res => res.json())
        .then(data =>
          dispatch({ type: "UPDATE_RECEIPES", target: recipe, payload: data })
        );
    }
  };
}
