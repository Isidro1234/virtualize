"use client"
import Image from 'next/image';
import { useState } from 'react';

export function MediaPreview({ src }: { src?: string }) {
  const [videoFailed, setVideoFailed] = useState(false);

  if (!src) return null;

  if (!videoFailed) {
    return (
      <video
        controls
        src={src}
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0 }}
        onError={() => setVideoFailed(true)}
      />
    );
  }

  // Fallback once we know it's not a playable video
  return (
    <Image alt='image'
      fill
      src={src}
      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0 }}
    />
  );
}