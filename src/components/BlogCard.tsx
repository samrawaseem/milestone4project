// components/BlogCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, imageUrl, title, description }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      {/* Image */}
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <Link href={`/blog/${id}`} className="px-6 py-4">
        {/* Title */}
        <div className="font-bold text-xl mb-2">{title}</div>

        {/* Description */}
        <p className="text-gray-700 text-base">{description}</p>
      </Link>
    </div>
  );
};

export default BlogCard;