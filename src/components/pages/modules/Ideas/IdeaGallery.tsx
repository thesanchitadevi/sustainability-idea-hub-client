"use client";

import { useState } from "react";
import Image from "next/image";
import { IIdeaImage } from "@/types";

export function IdeaGallery({ images }: { images: IIdeaImage[] }) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (images.length === 0) {
    return (
      <div className="bg-gray-100 aspect-video flex items-center justify-center rounded-lg">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={images[selectedImage].imageUrl}
          alt={`Idea image ${selectedImage + 1}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={image.imageUrl}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square rounded-md overflow-hidden transition-opacity ${
                index === selectedImage
                  ? "ring-2 ring-green-500"
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              <Image
                src={image.imageUrl}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
