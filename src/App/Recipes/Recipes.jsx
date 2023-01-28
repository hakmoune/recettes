import { Loader } from "../../UI/Loader";
import { memo } from "react";
import { PropTypes } from "prop-types";

export function Recipes({ recipes, onClick }) {
  if (recipes === null) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="row">
        {recipes.map(recipe => (
          <div className="col-md-4 mb-4" key={recipe.id}>
            <Recipe recipe={recipe} onClick={onClick} />
          </div>
        ))}
      </div>
    </div>
  );
}

const Recipe = memo(function Recipe({ recipe, onClick }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">{recipe.user.username}</div>
        <p className="card-text">{recipe.body}</p>
        <a href="#" className="btn btn-primary" onClick={() => onClick(recipe)}>
          Voir La Recette!
        </a>
      </div>
    </div>
  );
});

Recipes.propTypes = {
  recipes: PropTypes.array,
  onClick: PropTypes.func.isRequired
};

/*export function Recipes({ recipes, onDelete, onCreate, onUpdate }) {
  return (
    <div className="container">
      <h2>Recipes List:</h2>

      <CreateRecipes onCreate={onCreate} />

      {recipes ? (
        <RecipesList
          recipes={recipes}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
}

function CreateRecipes({ onCreate }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = function(e) {
    setLoading(true);
    e.preventDefault();
    const formData = e.target;
    onCreate(new FormData(formData));
    formData.reset();
    formData.querySelector("input").focus();
    setLoading(false);
  };

  return (
    <div>
      <form className="form-inline" onSubmit={handleSubmit}>
        <div className="form-group mx-sm-3 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Entrer votre titre..."
            name="body"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mb-2"
          disabled={loading}
        >
          Ajouter
        </button>
      </form>
      <hr />
    </div>
  );
}

function RecipesList({ recipes, onDelete, onUpdate }) {
  return (
    <ul>
      {recipes.map(recipe => (
        <Recipe
          recipe={recipe}
          key={recipe.id}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}

function Recipe({ recipe, onDelete, onUpdate }) {
  const [loading, setLoading] = useState(false);

  const handleClick = function() {
    setLoading(true);
    onDelete(recipe);
  };

  //Function that handle the update of the recipe (Not completed yet)
  const handleUpdate = function() {
    return;
  };

  return (
    <li>
      {recipe.body}
      <button
        type="button"
        className="btn btn-danger btn-sm mr-2"
        onClick={handleClick}
        disabled={loading}
      >
        <Trash />
      </button>
      <button
        type="button"
        className="btn btn-warning btn-sm mr-2"
        onClick={handleUpdate}
        disabled={loading}
      >
        <Upload />
      </button>
    </li>
  );
}*/
