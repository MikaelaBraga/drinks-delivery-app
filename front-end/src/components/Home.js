import React from 'react';
import { Link } from 'react-router-dom';

function HomeForm() {
  return (
    <div>
      <h1>Eu sou a Home</h1>
      <button type="button">
        <Link to="/login">Login</Link>
      </button>
    </div>
  );
}

export default HomeForm;
