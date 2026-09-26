"use client";

import { useState } from "react";

export default function DetailImage({
  src,
  alt,
  fallbackSeed,
}: {
  src: string;
  alt: string;
  fallbackSeed: number;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() =>
        setImgSrc(`https://picsum.photos/seed/${fallbackSeed}/700/900`)
      }
      className="w-full h-full max-h-[600px] object-cover rounded-2xl"
    />
  );
}