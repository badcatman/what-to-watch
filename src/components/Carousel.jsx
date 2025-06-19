import React, { useState, useEffect } from "react";

function Carousel({ items, currentPage, onPageChange, onRate, onToggleWatched, onDelete }) {
  const [expanded, setExpanded] = useState([]);
  const [touchStartX, setTouchStartX] = useState(null);

  const isMobile = window.innerWidth < 768;
  const itemsPerPage = isMobile ? 4 : 8;
  const maxIndex = Math.ceil(items.length / itemsPerPage) - 1;

  useEffect(() => {
    setExpanded(new Array(items.length).fill(false));
  }, [items]);

  const handleToggleExpand = (i) => {
    setExpanded((prev) => {
      const updated = [...prev];
      updated[i] = !updated[i];
      return updated;
    });
  };

  const next = () => onPageChange(Math.min(currentPage + 1, maxIndex));
  const prev = () => onPageChange(Math.max(currentPage - 1, 0));

  const currentItems = items.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (deltaX > 50) prev();
    else if (deltaX < -50) next();
    setTouchStartX(null);
  };

  return (
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div style={{ marginTop: "10px" }}>
        <button className="category-button" onClick={prev} disabled={currentPage === 0}>
          ←
        </button>
        <button className="category-button" onClick={next} disabled={currentPage === maxIndex}>
          →
        </button>
      </div>

      <div className="grid">
        {currentItems.map((item, i) => (
          <div className="card" key={item.title}>
            <img src={item.poster} alt={item.title} />
            <div className="card-content">
              <h3>{item.title}</h3>
              <p
                onClick={() => handleToggleExpand(i + currentPage * itemsPerPage)}
                style={{ cursor: "pointer" }}
              >
                {expanded[i + currentPage * itemsPerPage]
                  ? item.description
                  : item.description.split(".")[0] + "..."}
              </p>
              <div className="controls">
                <div className="rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => onRate(i + currentPage * itemsPerPage, star)}
                      style={{ color: (item.rating || 0) >= star ? "gold" : "#ccc", cursor: "pointer" }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <label>
                  <input
                    type="checkbox"
                    checked={item.watched || false}
                    onChange={() => onToggleWatched(i + currentPage * itemsPerPage)}
                  /> Просмотрено
                </label>
                <button onClick={() => onDelete(i + currentPage * itemsPerPage)}>Скрыть</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;