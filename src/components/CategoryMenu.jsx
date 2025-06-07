import React from "react";

const categories = ["Сериалы", "Ситкомы", "Мультсериалы", "Аниме"];

function CategoryMenu({ selected, onSelect }) {
  return (
    <div className="category">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`category-button ${cat === selected ? "active" : ""}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
