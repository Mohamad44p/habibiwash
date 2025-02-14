"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { ImageIcon, Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const mainVariant = {
  initial: { scale: 1 },
  animate: { scale: 1.02 },
};

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  height?: string; // Add height prop
}

export function ImageUpload({ value, onChange, height = "300px" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(value || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    setUploading(true);
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onChange(data.url);
    } catch (error) {
      console.error("Upload error:", error);
      setPreview("");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value) {
      try {
        const response = await fetch(`/api/upload?url=${encodeURIComponent(value)}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete image');
        }
        
        setPreview("");
        onChange("");
      } catch (error) {
        console.error('Delete error:', error);
      }
    } else {
      setPreview("");
      onChange("");
    }
  };

  const { getRootProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    multiple: false,
    noClick: true,
    onDrop: handleUpload,
  });

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        variants={mainVariant}
        className={cn(
          "relative overflow-hidden rounded-lg cursor-pointer",
          "border-2 border-dashed border-gray-200 dark:border-gray-800",
          "transition-colors duration-200",
          isDragActive && "border-blue-500 bg-blue-50/10"
        )}
        style={{ minHeight: height }}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={(e) => handleUpload(Array.from(e.target.files || []))}
          accept="image/*"
          className="hidden"
        />
        
        <div className="p-4">
          {preview || value ? (
            <motion.div
              layoutId="preview"
              className="relative w-full overflow-hidden rounded-lg"
              style={{ height }}
            >
              <Image
                src={preview || value || ''}
                alt="Upload preview"
                fill
                className="object-contain"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {uploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
                </div>
              )}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 h-full py-12">
              <motion.div
                layoutId="upload-icon"
                className={cn(
                  "p-6 rounded-full bg-gray-50 dark:bg-gray-900/50",
                  "transition-colors duration-200",
                  isDragActive && "bg-blue-50 dark:bg-blue-900/20"
                )}
              >
                {isDragActive ? (
                  <Upload className="w-10 h-10 text-blue-500" />
                ) : (
                  <ImageIcon className="w-10 h-10 text-gray-400" />
                )}
              </motion.div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {isDragActive ? "Drop your image here" : "Upload an image"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Drag and drop or click to select
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {uploading && (
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500" />
          Uploading...
        </div>
      )}
    </div>
  );
}

