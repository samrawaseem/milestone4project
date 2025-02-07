"use client"; // Required for hooks in Next.js 14

import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { createClient } from "@sanity/client";

interface BlogPost {
  _id: string;
  title: string;
  imageUrl: string;
  body: {
    _type: string;
    style: string;
    _key: string;
    children: { text: string; _key: string; _type: string; marks: string[] }[];
  }[];
}

const sanity = createClient({
  projectId: "vrxph4cd",
  dataset: "production",
  apiVersion: "2025-01-13",
  useCdn: true,
});

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const fetchPosts = async () => {
    try {
      const query = `*[_type == "post"]{
        _id,
        title,
        "imageUrl": mainImage.asset->url,
        body
      }`;

      const data = await sanity.fetch<BlogPost[]>(query);
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const getDescription = (body: BlogPost["body"]) => {
    if (!body || body.length === 0) return "No description available";
    return body[0]?.children?.map((child) => child.text).join(" ") || "No description available";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 p-6 w-[80%] mx-auto">
      {posts.map((post) => (
        <BlogCard
          id={post._id}
          key={post._id}
          imageUrl={post.imageUrl}
          title={post.title}
          description={getDescription(post.body)}
        />
      ))}
    </div>
  );
}
