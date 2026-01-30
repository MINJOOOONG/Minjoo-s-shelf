'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface BookCardProps {
  title: string;
  author: string;
  summary: string;
  coverImage: string;
  tags: string[];
  isbn?: string;
}

export default function BookCard({ title, author, summary, coverImage, tags, isbn }: BookCardProps) {
  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [fallbackLevel, setFallbackLevel] = useState(0);

  const openLibraryUrl = isbn ? `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg` : null;
  const placeholderUrl = '/cover-placeholder.svg';

  useEffect(() => {
    setFallbackLevel(0);
    setImageError(false);
    if (isbn && openLibraryUrl) {
      setCurrentImageSrc(openLibraryUrl);
    } else {
      setCurrentImageSrc(coverImage);
      setFallbackLevel(1);
    }
  }, [isbn, openLibraryUrl, coverImage]);

  const handleImageError = () => {
    if (fallbackLevel === 0 && coverImage) {
      setCurrentImageSrc(coverImage);
      setFallbackLevel(1);
    } else if (fallbackLevel === 1) {
      setCurrentImageSrc(placeholderUrl);
      setFallbackLevel(2);
    } else {
      setImageError(true);
    }
  };

  const searchKeyword = `${title} ${author}`;
  const aladinUrl = `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchWord=${encodeURIComponent(searchKeyword)}`;
  const kyoboUrl = `https://search.kyobobook.co.kr/search?keyword=${encodeURIComponent(searchKeyword)}`;
  const yes24Url = `https://www.yes24.com/Product/Search?domain=ALL&query=${encodeURIComponent(searchKeyword)}`;

  return (
    <div className="card overflow-hidden">
      {/* Book Cover - Large Image */}
      <div className="relative w-full aspect-[3/4] bg-[var(--bg-secondary)]">
        {!imageError && currentImageSrc ? (
          <Image
            src={currentImageSrc}
            alt={title}
            fill
            className="object-cover"
            onError={handleImageError}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-[var(--accent)] to-pink-500">
            📖
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Book info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-full bg-white/20 text-white backdrop-blur-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
          <h3 className="font-bold text-xl text-white mb-1">{title}</h3>
          <p className="text-white/70 text-sm">{author}</p>
        </div>
      </div>

      {/* Book Details */}
      <div className="p-5">
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5">
          {summary}
        </p>

        {/* Purchase Links */}
        <p className="text-xs text-[var(--text-muted)] mb-3">📚 지금 바로 구매하기</p>
        <div className="grid grid-cols-3 gap-2">
          <a
            href={aladinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center py-3 rounded-xl text-sm font-medium transition-all hover:scale-105 hover:shadow-lg"
            style={{ background: '#e63312', color: 'white' }}
          >
            알라딘
          </a>
          <a
            href={kyoboUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center py-3 rounded-xl text-sm font-medium transition-all hover:scale-105 hover:shadow-lg"
            style={{ background: '#004098', color: 'white' }}
          >
            교보문고
          </a>
          <a
            href={yes24Url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center py-3 rounded-xl text-sm font-medium transition-all hover:scale-105 hover:shadow-lg"
            style={{ background: '#00b0f0', color: 'white' }}
          >
            YES24
          </a>
        </div>
      </div>
    </div>
  );
}
