import React from "react";

export default function OutfitDisplay({ outfit }) {
  if (!outfit) return null;

  return (
    <div>
      {outfit.map((item, i) => (
        <img key={i} src={item.s3Url} alt={item.attributes.join(", ")} />
      ))}
    </div>
  );
}
