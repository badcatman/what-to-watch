import React, { useState } from "react";
import content from "./data/content";
import CategoryMenu from "./components/CategoryMenu";
import Carousel from "./components/Carousel";

function App() {
  const [category, setCategory] = useState("Сериалы");

  return (
    <div className="container">
      <h1>Что посмотреть?</h1>
      <CategoryMenu selected={category} onSelect={setCategory} />
      <Carousel items={content[category]} />
    </div>
  );
}

export default App;
