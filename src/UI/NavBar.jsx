export function NavBar({ currentPage, onClick }) {
  const navClass = function(page) {
    let className = "nav-item";
    if (page === currentPage) {
      className = "active";
    }
    return className;
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
      <a
        href="#recipes"
        className="navbar-brand"
        onClick={() => onClick("recipes")}
      >
        Reccettes
      </a>
      <ul className="navbar-nav mr-auto">
        <li className={navClass("recipes")}>
          <a
            href="#recipes"
            className="nav-link"
            onClick={() => onClick("recipes")}
          >
            Recettes
          </a>
        </li>

        <li className={navClass("ingredients")}>
          <a
            href="#ingredients"
            className="nav-link"
            onClick={() => onClick("ingredients")}
          >
            Ingrédients
          </a>
        </li>
      </ul>
    </nav>
  );
}
