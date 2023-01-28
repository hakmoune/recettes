import PropTypes from "prop-types";
import { Loader } from "../../UI/Loader";
import { useState, memo } from "react";
import { Trash, Upload } from "../../UI/Icon";

export function Ingredients({ ingredients, onDelete, onUpdate, onCreate }) {
  return (
    <div className="container">
      <h2>List des Ingredients</h2>
      <CreateIngredient onCreate={onCreate} />
      {ingredients === null ? (
        <Loader />
      ) : (
        <IngredientsList
          ingredients={ingredients}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
}

const CreateIngredient = memo(function CreateIngredient({ onCreate }) {
  const [loading, setLoading] = useState(false);
  const handleCreate = function(e) {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    onCreate(new FormData(form));
    form.reset();
    form.querySelector("input").focus();
    setLoading(false);
  };
  return (
    <form onSubmit={handleCreate}>
      <input type="text" name="title" className="mr-2" />
      <input type="text" name="userId" className="mr-2" />
      <button type="submit" className="btn btn-info" disabled={loading}>
        Ajouter
      </button>
    </form>
  );
});

function IngredientsList({ ingredients, onDelete, onUpdate }) {
  return (
    <div>
      {ingredients.map((ingredient, index) => (
        <Ingredient
          ingredient={ingredient}
          key={index}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

const Ingredient = memo(function Ingredient({
  ingredient,
  onDelete,
  onUpdate
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = function(e) {
    e.preventDefault();
    setLoading(true);
    onDelete(ingredient);
    setLoading(false);
  };

  const handleUpdateSubmit = function(e) {
    e.preventDefault();
    setLoading(true);

    const data = new FormData(e.target);
    onUpdate(ingredient, data);

    setLoading(false);
  };

  return (
    <form onSubmit={handleUpdateSubmit}>
      <input
        type="text"
        defaultValue={ingredient.title}
        name="title"
        className="mr-2"
      />
      <input
        type="text"
        defaultValue={
          ingredient.reactions ? ingredient.reactions : ingredient.userId
        }
        name="reactions"
        className="mr-2"
      />

      <button
        onClick={handleDelete}
        className="btn btn-danger btn-sm mr-2"
        disabled={loading}
      >
        <Trash />
      </button>

      <button
        type="submit"
        className="btn btn-warning btn-sm mr-2"
        disabled={loading}
      >
        <Upload />
      </button>
    </form>
  );
});

Ingredients.propTypes = {
  ingredients: PropTypes.array
}; //Min 25
