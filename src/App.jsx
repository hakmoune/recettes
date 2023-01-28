import { React, useState } from "react";
import { LoginForm } from "./App/LoginForm";
import { Site } from "./App/Site";

export default function App() {
  const [user, setUser] = useState(null);
  //localStorage.clear();

  return localStorage.getItem("user") ? (
    <Site />
  ) : (
    <LoginForm onConnect={setUser} />
  );
}
