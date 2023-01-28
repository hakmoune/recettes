import PropTypes from "prop-types";
import { Modal } from "../../UI/Modal";

export function RecipeDetails({ recipe, onClose }) {
  return (
    <Modal title={recipe.user.username} onClose={onClose}>
      <RecipeDetailsModal recipe={recipe} />
    </Modal>
  );
}

function RecipeDetailsModal({ recipe }) {
  return recipe.body;
}

RecipeDetails.propTypes = {
  recipe: PropTypes.object.isRequired
};
