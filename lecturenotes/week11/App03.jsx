// brings in react useState code
import { useState } from "react";

const Home = () => {
  // sets up useState, what variable, what function changes it, and what start value
  const [name, setName] = useState("Eli");

  // function actually making dynamic change
  let handleClick = () => {
    setName("Blackberry");
  }

  return (
    <div>
      <h1>Hello World</h1>
      <p>{name}</p>
      <button onClick={handleClick}>Update</button>
    </div>
  );
}

export default Home