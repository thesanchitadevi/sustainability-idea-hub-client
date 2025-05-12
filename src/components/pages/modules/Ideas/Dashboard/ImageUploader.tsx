/* eslint-disable @next/next/no-img-element */

"use client";

import { X } from "lucide-react";
import { ChangeEvent, useState } from "react";

type ImageUploaderProps = {
  onImagesChange: (files: File[]) => void;
};

export const ImageUploader = ({ onImagesChange }: ImageUploaderProps) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      onImagesChange(newImages);

      // Create previews
      const newPreviews: string[] = [];
      newImages.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === newImages.length) {
            setImagePreviews((prev) => [...prev, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    onImagesChange(
      imagePreviews.filter((_, i) => i !== index).map(() => new File([], ""))
    ); // This is a placeholder - you might want to handle this differently
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-medium">Upload Images</h2>
        <p className="text-sm text-muted-foreground">
          Upload up to 5 images (JPEG, JPG, PNG)
        </p>
      </div>

      <div className="rounded-lg border border-dashed p-6 text-center hover:border-primary transition-colors">
        <div className="flex flex-col items-center justify-center gap-4">
          <svg
            className="h-12 w-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <div className="flex flex-col gap-2 items-center">
            <label className="cursor-pointer">
              <span>Upload images</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="sr-only"
              />
            </label>
            <p className="text-sm text-muted-foreground">
              or drag and drop files here
            </p>
          </div>
        </div>
      </div>

      {/* Image Previews */}
      {imagePreviews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative group">
              <img
                src={preview}
                alt={`Preview ${index}`}
                className="w-full h-32 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
