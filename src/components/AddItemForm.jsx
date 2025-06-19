import React, { useState } from "react";

function AddItemForm({ categories = [], onAdd, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(() =>
    categories.length > 0 ? categories[0] : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !category) return;

    const newItem = {
      title,
      description,
      poster: "posters/placeholder.jpg", // можно позже расширить
      watched: false,
      rating: 0,
    };

    onAdd(category, newItem);
  };

  if (!categories || categories.length === 0) {
    return <p>Нет доступных категорий для добавления.</p>;
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2>Добавить новую позицию</h2>
      <label>
        Название:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Описание:
        <textarea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Категория:
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </label>
      <div style={{ marginTop: "12px" }}>
        <button type="submit" className="category-button">Сохранить</button>
        <button type="button" className="category-button" onClick={onCancel}>Отмена</button>
      </div>
    </form>
  );
}

export default AddItemForm;
