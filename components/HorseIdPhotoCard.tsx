"use client";

import { useState } from "react";

interface HorseIdPhotoCardProps {
  imageSrc?: string;
  title?: string;
  subtitle?: string;
  overlayColor?: string;
  className?: string;
  onImageChange?: (file: File) => void;
}

export default function HorseIdPhotoCard({
  imageSrc,
  title = "Horse Photo",
  subtitle,
  overlayColor = "gray-900/60",
  className = "",
  onImageChange,
}: HorseIdPhotoCardProps) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(imageSrc);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onImageChange?.(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onImageChange?.(file);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Card Container */}
      <div className="relative w-full aspect-[9/16] rounded-[2rem] overflow-hidden bg-black shadow-2xl">
        
        {/* Background Image or Placeholder */}
        <div 
          className="absolute inset-0"
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <p className="text-sm">Tap to upload photo</p>
              </div>
            </div>
          )}

          {/* Gray Overlay Outside Frame */}
          <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-${overlayColor}`} />
        </div>

        {/* Viewfinder Frame Overlay */}
        <div className="absolute inset-0">
          
          {/* Top gradient fade */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/40 to-transparent" />
          
          {/* Bottom blur/fog effect */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 via-black/30 to-transparent backdrop-blur-[2px]" />
          
          {/* Corner Frame - Top Left */}
          <div className="absolute top-8 left-6">
            <div className="w-12 h-12 relative">
              <div className="absolute top-0 left-0 w-8 h-1 bg-white rounded-full" />
              <div className="absolute top-0 left-0 w-1 h-8 bg-white rounded-full" />
              <div className="absolute top-0 left-0 w-4 h-0.5 bg-white/60 rounded-full" />
              <div className="absolute top-0 left-0 w-0.5 h-4 bg-white/60 rounded-full" />
            </div>
          </div>

          {/* Corner Frame - Top Right */}
          <div className="absolute top-8 right-6">
            <div className="w-12 h-12 relative">
              <div className="absolute top-0 right-0 w-8 h-1 bg-white rounded-full" />
              <div className="absolute top-0 right-0 w-1 h-8 bg-white rounded-full" />
              <div className="absolute top-0 right-0 w-4 h-0.5 bg-white/60 rounded-full" />
              <div className="absolute top-0 right-0 w-0.5 h-4 bg-white/60 rounded-full" />
            </div>
          </div>

          {/* Corner Frame - Bottom Left */}
          <div className="absolute bottom-28 left-6">
            <div className="w-12 h-12 relative">
              <div className="absolute bottom-0 left-0 w-8 h-1 bg-white rounded-full" />
              <div className="absolute bottom-0 left-0 w-1 h-8 bg-white rounded-full" />
              <div className="absolute bottom-0 left-0 w-4 h-0.5 bg-white/60 rounded-full" />
              <div className="absolute bottom-0 left-0 w-0.5 h-4 bg-white/60 rounded-full" />
            </div>
          </div>

          {/* Corner Frame - Bottom Right */}
          <div className="absolute bottom-28 right-6">
            <div className="w-12 h-12 relative">
              <div className="absolute bottom-0 right-0 w-8 h-1 bg-white rounded-full" />
              <div className="absolute bottom-0 right-0 w-1 h-8 bg-white rounded-full" />
              <div className="absolute bottom-0 right-0 w-4 h-0.5 bg-white/60 rounded-full" />
              <div className="absolute bottom-0 right-0 w-0.5 h-4 bg-white/60 rounded-full" />
            </div>
          </div>

          {/* Center Guide Dots */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          </div>

          {/* Top Status Badge */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2">
            <div className="px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-white/80 text-[10px] font-medium tracking-wider uppercase">
                ID Photo
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white">
          <div className="px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-black font-medium text-base">{title}</h3>
                {subtitle && (
                  <p className="text-gray-500 text-sm mt-0.5">{subtitle}</p>
                )}
              </div>
              
              {/* Upload Button */}
              <label className="cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          
          {/* Drag indicator */}
          {isDragging && (
            <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center">
              <span className="text-cyan-600 font-medium text-sm">Drop image here</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
