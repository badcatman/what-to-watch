import React, { useState } from "react";
import content from "./data/content";
import CategoryMenu from "./components/CategoryMenu";
import Carousel from "./components/Carousel";

function App() {
  const [category, setCategory] = useState("Сериалы");

  return (
    <div className="container">
      <div className="header-container">
<span className="header">Что посмотреть?</span>
      <CategoryMenu selected={category} onSelect={setCategory} />
      </div>
    
      <Carousel items={content[category]} />
    </div>
  );
}

export default App;
