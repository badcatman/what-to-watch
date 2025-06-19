import React, { useState, useEffect } from "react";
import contentData from "./data/content";
import CategoryMenu from "./components/CategoryMenu";
import Carousel from "./components/Carousel";
import AddItemForm from "./components/AddItemForm";

function App() {
  const savedCategory = localStorage.getItem("selected-category") || "Сериалы";
  const savedPages = JSON.parse(localStorage.getItem("category-pages") || "{}");

  const [category, setCategory] = useState(savedCategory);
  const [categoryPages, setCategoryPages] = useState(savedPages);
  const [content, setContent] = useState(() => {
    const stored = localStorage.getItem("what-to-watch-content");
    return stored ? JSON.parse(stored) : contentData;
  });

  const [isAdding, setIsAdding] = useState(false);

  const currentPage = categoryPages[category] || 0;

  useEffect(() => {
    localStorage.setItem("what-to-watch-content", JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem("selected-category", category);
    localStorage.setItem("category-pages", JSON.stringify(categoryPages));
  }, [category, categoryPages]);

  const updateItem = (categoryName, index, updates) => {
    const updatedCategory = [...content[categoryName]];
    updatedCategory[index] = { ...updatedCategory[index], ...updates };
    setContent((prev) => ({ ...prev, [categoryName]: updatedCategory }));
  };

  const deleteItem = (categoryName, index) => {
    const confirmed = window.confirm("Вы уверены, что хотите скрыть эту позицию?");
    if (!confirmed) return;
    const updatedCategory = [...content[categoryName]];
    updatedCategory[index].hidden = true;
    setContent((prev) => ({ ...prev, [categoryName]: updatedCategory }));
  };

  const addItem = (categoryName, newItem) => {
    const currentList = content[categoryName] || [];
    const updatedCategory = [newItem, ...currentList];
    setContent((prev) => ({ ...prev, [categoryName]: updatedCategory }));
    setCategory(categoryName);
    setCategoryPages((prev) => ({ ...prev, [categoryName]: 0 }));
    setIsAdding(false);
  };

  const visibleItems = (content[category] || []).filter((item) => !item.hidden);
  const sortedItems = [...visibleItems].sort((a, b) => {
    if (a.watched && !b.watched) return 1;
    if (!a.watched && b.watched) return -1;
    return 0;
  });

  const handlePageChange = (page) => {
    setCategoryPages((prev) => ({ ...prev, [category]: page }));
  };

  return (
    <div className="container">
      <div className="header-container">
        <span className="header">Что посмотреть?</span>
        <CategoryMenu selected={category} onSelect={(cat) => {
          setCategory(cat);
        }} />
        <button className="add-button" onClick={() => setIsAdding(true)}>+</button>
      </div>

      {isAdding ? (
        <AddItemForm
          categories={Object.keys(content)}
          onAdd={addItem}
          onCancel={() => setIsAdding(false)}
        />
      ) : (
        <Carousel
          items={sortedItems}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onRate={(visibleIndex, stars) => {
            const realIndex = content[category].findIndex(
              (item) => !item.hidden && sortedItems.indexOf(item) === visibleIndex
            );
            updateItem(category, realIndex, { rating: stars });
          }}
          onToggleWatched={(visibleIndex) => {
            const realIndex = content[category].findIndex(
              (item) => !item.hidden && sortedItems.indexOf(item) === visibleIndex
            );
            const current = sortedItems[visibleIndex].watched;
            updateItem(category, realIndex, { watched: !current });
          }}
          onDelete={(visibleIndex) => {
            const realIndex = content[category].findIndex(
              (item) => !item.hidden && sortedItems.indexOf(item) === visibleIndex
            );
            deleteItem(category, realIndex);
          }}
        />
      )}
    </div>
  );
}

export default App;
