import { useEffect, useState } from "react";

export function HeroSlideshow({ images }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      5000,
    );
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((img, i) => (
        <img
          key={img.landmarkId ?? i}
          src={img.imageUrl}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950/90 via-navy-950/80 to-navy-950/95" />
    </div>
  );
}
