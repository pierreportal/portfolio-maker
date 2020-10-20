import React, { useState } from "react";
import { login } from "../api";

export default function Login(props) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = () => login(credentials);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          placeholder="********"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
