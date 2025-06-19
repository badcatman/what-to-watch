import React, { useState, useEffect } from "react";
import contentData from "./data/content";
import CategoryMenu from "./components/CategoryMenu";
import Carousel from "./components/Carousel";
import AddItemForm from "./components/AddItemForm";

function App() {
  const [category, setCategory] = useState("Сериалы");
  const [mode, setMode] = useState("normal"); // "normal" или "add"
  const [content, setContent] = useState(() => {
    const stored = localStorage.getItem("what-to-watch-content");
    return stored ? JSON.parse(stored) : contentData;
  });

  useEffect(() => {
    localStorage.setItem("what-to-watch-content", JSON.stringify(content));
  }, [content]);

  const updateItem = (categoryName, index, updates) => {
    const updatedCategory = [...content[categoryName]];
    updatedCategory[index] = { ...updatedCategory[index], ...updates };
    setContent((prev) => ({ ...prev, [categoryName]: updatedCategory }));
  };

  const deleteItem = (categoryName, index) => {
    const updatedCategory = [...content[categoryName]];
    updatedCategory[index].hidden = true;
    setContent((prev) => ({ ...prev, [categoryName]: updatedCategory }));
  };

  const addItem = (categoryName, newItem) => {
    const updatedCategory = [newItem, ...(content[categoryName] || [])];
    setContent((prev) => ({ ...prev, [categoryName]: updatedCategory }));
    setCategory(categoryName);
    setMode("normal");
  };

  return (
    <div className="container">
      <div className="header-container">
        <span className="header">Что посмотреть?</span>
        <CategoryMenu
          selected={category}
          onSelect={(cat) => {
            setCategory(cat);
            setMode("normal");
          }}
        />
        <button
          className="add-button"
          onClick={() => setMode("add")}
        >
          +
        </button>
      </div>

      {mode === "add" ? (
        <AddItemForm
          categories={Object.keys(content)}
          onAdd={addItem}
          onCancel={() => setMode("normal")}
        />
      ) : (
        <Carousel
          items={content[category].filter((item) => !item.hidden)}
          category={category}
          onRate={(index, stars) => updateItem(category, index, { rating: stars })}
          onToggleWatched={(index) => {
            const current = content[category][index].watched;
            updateItem(category, index, { watched: !current });
          }}
          onDelete={(index) => deleteItem(category, index)}
        />
      )}
    </div>
  );
}

export default App;
