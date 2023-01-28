import React, { useState, Children } from "react";
import PropTypes from "prop-types";

function Alert({ children }) {
  return <div className="alert alert-danger">{children}</div>;
}

export function LoginForm({ onConnect }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async function(e) {
    setError(null);
    setLoading(true);

    e.preventDefault();
    const data = new FormData(e.target);

    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.get("username"), //kminchelle
        password: data.get("password") //0lelplR
        // expiresInMins: 60, // optional

        // https://dummyjson.com/users
      })
    });
    const responseData = await response.json();

    if (response.ok) {
      onConnect(responseData);
      localStorage.setItem("user", JSON.stringify(responseData));
    } else {
      setError(responseData.message);
      setLoading(false);
    }
  };

  return (
    <form className="container mt-4" onSubmit={handleSubmit}>
      <h2>Se Connecter</h2>

      {error && <Alert>{error}</Alert>}

      <div className="form-goup">
        <label htmlFor="username">Nom d'utilisateur: </label>
        <input
          type="text"
          name="username"
          id="username"
          className="form-control"
          defaultValue="kminchelle"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Mot de passe: </label>
        <input
          type="password"
          name="password"
          id="password"
          className="form-control"
          defaultValue="0lelplR"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        Se connecter
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  onConnect: PropTypes.func.isRequired
};
/**
 * Card.defaultProps = {
    title: 'Mon titre par défaut',
}
 */
