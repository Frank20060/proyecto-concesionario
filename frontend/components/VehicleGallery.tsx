'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

import { normalizeMediaUrl } from '@/lib/images';

interface VehicleGalleryProps {
  images: string[];
  alt: string;
}

export default function VehicleGallery({ images, alt }: VehicleGalleryProps) {
  const normalizedImages = useMemo(
    () => images.map(normalizeMediaUrl),
    [images],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (normalizedImages.length === 0) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center border border-stone-200 bg-stone-100">
        <span className="font-serif text-6xl font-light text-stone-300">
          {alt.charAt(0)}
        </span>
      </div>
    );
  }

  const selectedImage = normalizedImages[selectedIndex] ?? normalizedImages[0];

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden border border-stone-200 bg-stone-100">
        <Image
          src={selectedImage}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
        />
      </div>

      {normalizedImages.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {normalizedImages.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-[4/3] overflow-hidden border ${
                index === selectedIndex
                  ? 'border-stone-900 ring-2 ring-stone-900'
                  : 'border-stone-200 hover:border-stone-400'
              }`}
            >
              <Image
                src={image}
                alt={`${alt} ${index + 1}`}
                fill
                className="object-cover"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
