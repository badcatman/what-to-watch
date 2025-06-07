import React, { useState, useEffect, useRef } from "react";

function Carousel({ items }) {
  const isMobile = window.innerWidth < 768;
  const itemsPerPage = isMobile ? 4 : 8;
  const [index, setIndex] = useState(0);
  const [expandedItems, setExpandedItems] = useState({});
  const containerRef = useRef(null);
  const touchStartX = useRef(null);

  const maxIndex = Math.ceil(items.length / itemsPerPage) - 1;

  const next = () => setIndex((prev) => Math.min(prev + 1, maxIndex));
  const prev = () => setIndex((prev) => Math.max(prev - 1, 0));

  const toggleDescription = (title) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const currentItems = items.slice(
    index * itemsPerPage,
    index * itemsPerPage + itemsPerPage
  );

  // Свайп
  useEffect(() => {
    const container = containerRef.current;

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          next(); // свайп влево
        } else {
          prev(); // свайп вправо
        }
      }
    };

    if (container) {
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [index]);

  return (
    <div ref={containerRef}>
      <div style={{ marginTop: "10px" }}>
        <button className="category-button" onClick={prev} disabled={index === 0}>
          ←
        </button>
        <button className="category-button" onClick={next} disabled={index === maxIndex}>
          →
        </button>
      </div>
      <div className="grid">
        {currentItems.map((item) => {
          const isExpanded = expandedItems[item.title];
          const shortText = item.description.slice(0, 70) + "...";

          return (
            <div className="card" key={item.title} onClick={() => toggleDescription(item.title)}>
              <img src={item.poster} alt={item.title} />
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>
                  {isExpanded ? item.description : shortText}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Carousel;
