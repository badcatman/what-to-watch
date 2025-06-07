import React, { useState } from "react";

function Carousel({ items }) {
  const isMobile = window.innerWidth < 768;
  const itemsPerPage = isMobile ? 2 : 8;
  const [index, setIndex] = useState(0);

  const maxIndex = Math.ceil(items.length / itemsPerPage) - 1;

  const next = () => setIndex((prev) => Math.min(prev + 1, maxIndex));
  const prev = () => setIndex((prev) => Math.max(prev - 1, 0));

  const currentItems = items.slice(
    index * itemsPerPage,
    index * itemsPerPage + itemsPerPage
  );

  return (
    <div>
      <div className="grid">
        {currentItems.map((item) => (
          <div className="card" key={item.title}>
            <img src={item.poster} alt={item.title} />
            <div className="card-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        <button className="category-button" onClick={prev} disabled={index === 0}>
          ←
        </button>
        <button className="category-button" onClick={next} disabled={index === maxIndex}>
          →
        </button>
      </div>
    </div>
  );
}

export default Carousel;
