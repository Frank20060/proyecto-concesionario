'use client';

import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';

import { normalizeMediaUrl } from '@/lib/images';

interface VehicleGalleryProps {
  images: string[];
  alt: string;
}

/**
 * VehicleGallery — Galería de imágenes del vehículo.
 *
 * Accesibilidad:
 * - role="tablist" en thumbnails, role="tab" en cada botón
 * - aria-label por thumbnail, aria-selected
 * - Navegación por teclado (←/→)
 * - priority=true solo en la imagen principal (primera)
 * - blur placeholder en thumbnails
 */
export default function VehicleGallery({ images, alt }: VehicleGalleryProps) {
  const normalizedImages = useMemo(
    () => images.map(normalizeMediaUrl),
    [images],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Blur placeholder base64 (color neutral)
  const blurDataURL =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iI2YxZjVmOSIvPjwvc3ZnPg==';

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, normalizedImages.length - 1));
      setSelectedIndex(clamped);
    },
    [normalizedImages.length],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goTo(selectedIndex + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goTo(selectedIndex - 1);
      }
    },
    [selectedIndex, goTo],
  );

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
      {/* Imagen principal */}
      <div
        className="relative aspect-[16/10] overflow-hidden border border-stone-200 bg-stone-100"
        style={{ borderRadius: 'var(--radius-card)' }}
      >
        <Image
          src={selectedImage}
          alt={`${alt} — foto ${selectedIndex + 1} de ${normalizedImages.length}`}
          fill
          className="object-cover transition-opacity duration-200"
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority={true}
          placeholder="blur"
          blurDataURL={blurDataURL}
        />

        {/* Flechas de navegación (visibles siempre en mobile, en hover en desktop) */}
        {normalizedImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(selectedIndex - 1)}
              disabled={selectedIndex === 0}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-stone-700 shadow-md backdrop-blur-sm transition-all hover:bg-white disabled:opacity-30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => goTo(selectedIndex + 1)}
              disabled={selectedIndex === normalizedImages.length - 1}
              aria-label="Foto siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-stone-700 shadow-md backdrop-blur-sm transition-all hover:bg-white disabled:opacity-30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </>
        )}

        {/* Contador */}
        {normalizedImages.length > 1 && (
          <span
            aria-live="polite"
            className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white backdrop-blur-sm"
          >
            {selectedIndex + 1} / {normalizedImages.length}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {normalizedImages.length > 1 && (
        <div
          role="tablist"
          aria-label={`Galería de fotos de ${alt}`}
          className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5"
          onKeyDown={handleKeyDown}
        >
          {normalizedImages.map((image, index) => (
            <button
              key={image}
              type="button"
              role="tab"
              aria-selected={index === selectedIndex}
              aria-label={`Ver foto ${index + 1} de ${alt}`}
              onClick={() => setSelectedIndex(index)}
              className="relative aspect-[4/3] overflow-hidden border-2 transition-all"
              style={{
                borderColor:
                  index === selectedIndex ? 'var(--color-accent)' : 'transparent',
                borderRadius: '0.375rem',
                outline: 'none',
              }}
            >
              <Image
                src={image}
                alt={`${alt} miniatura ${index + 1}`}
                fill
                className="object-cover"
                sizes="120px"
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
