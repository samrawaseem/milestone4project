"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@sanity/client";
import Image from "next/image";

interface BlogPost {
  _id: string;
  title: string;
  imageUrl: string;
  body: { children: { text: string }[] }[];
}

const sanity = createClient({
  projectId: "vrxph4cd",
  dataset: "production",
  apiVersion: "2025-01-13",
  useCdn: true,
});

export default function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const query = `*[_type == "post" && _id == $id][0]{
          _id,
          title,
          "imageUrl": mainImage.asset->url,
          body
        }`;

        const data = await sanity.fetch<BlogPost>(query, { id });
        setPost(data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center text-xl py-10">Loading...</p>;
  if (!post) return <p className="text-center text-xl py-10">Blog post not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Blog Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

      {/* Main Image */}
      {post.imageUrl && (
        <div className="mt-6">
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={800}
            height={450}
            className="w-full rounded-lg shadow-md"
            priority
          />
        </div>
      )}

      {/* Blog Description */}
      <div className="mt-6 text-gray-800 text-lg leading-relaxed">
        {post.body?.map((block, index) => (
          <p key={index}>{block.children?.map((child) => child.text).join(" ")}</p>
        ))}
      </div>
    </div>
  );
}
