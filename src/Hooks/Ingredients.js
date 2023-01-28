import { useReducer, useCallback } from "react";

function reducer(state, action) {
  console.log("INGREDIENTS_REDUCER", action.type, action);
  switch (action.type) {
    case "FETCHING_INGREDIENTS":
      return { ...state, loading: true };
    case "SET_INGREDIENTS":
      return { ...state, ingredients: action.payload, loading: false };
    case "DELETE_INGREDIENT":
      return {
        ...state,
        ingredients: state.ingredients.filter(
          ingredient => ingredient !== action.payload
        )
      };
    case "ADD_INGREDIENT":
      return { ...state, ingredients: [action.payload, ...state.ingredients] };
    case "UPDATE_INGREDIENT":
      return {
        ...state,
        ingredients: state.ingredients.map(ingredient =>
          ingredient === action.target ? action.payload : ingredient
        )
      };
    default:
      throw new Error("Action inconnue " + action.type);
  }
}

export function useIngredients() {
  const [state, dispatch] = useReducer(reducer, {
    ingredients: null,
    loading: false
  });

  return {
    ingredients: state.ingredients,
    fetchIngredients: useCallback(
      function() {
        if (state.loading || state.ingredients) {
          return;
        }

        dispatch({ type: "FETCHING_INGREDIENTS" });
        fetch("https://dummyjson.com/posts")
          .then(res => res.json())
          .then(({ posts }) =>
            dispatch({ type: "SET_INGREDIENTS", payload: posts })
          );
      },
      [state]
    ),
    deleteIngredient: useCallback(function(ingredient) {
      fetch("https://dummyjson.com/posts/" + ingredient.id, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(
          data =>
            data.isDeleted &&
            dispatch({ type: "DELETE_INGREDIENT", payload: ingredient })
        );
    }, []),
    updateIngredient: useCallback(function(ingredient, data) {
      fetch("https://dummyjson.com/posts/" + ingredient.id, {
        method: "PUT" /* or PATCH */,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.get("title"),
          reactions: data.get("reactions")
        })
      })
        .then(res => res.json())
        .then(newIngredient =>
          dispatch({
            type: "UPDATE_INGREDIENT",
            payload: newIngredient,
            target: ingredient
          })
        );
    }, []),
    createIngredient: useCallback(function(data) {
      fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.get("title"),
          userId: data.get("userId")
        })
      })
        .then(res => res.json())
        .then(newIngredient =>
          dispatch({ type: "ADD_INGREDIENT", payload: newIngredient })
        );
    }, [])
  };
}
