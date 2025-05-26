"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
};

export function LatestBlogPosts() {
  const posts: BlogPost[] = [
    {
      id: "1",
      title: "How Our Platform is Transforming Innovation in Bangladesh",
      excerpt:
        "Discover how local innovators are solving community challenges through collaborative idea sharing...",
      category: "Platform Updates",
      date: "May 15, 2023",
      imageUrl: "https://i.postimg.cc/YSd6vkdt/innovation.jpg",
    },
    {
      id: "2",
      title: "Top 10 Ideas That Changed Communities in 2023",
      excerpt:
        "A look at the most impactful solutions developed by our community members this year...",
      category: "Success Stories",
      date: "April 28, 2023",
      imageUrl: "https://i.postimg.cc/dQyCY8cs/blog1.jpg",
    },
    {
      id: "3",
      title: "The Psychology Behind Great Ideas",
      excerpt:
        "Understanding how creativity works and how to foster innovative thinking in your community...",
      category: "Innovation",
      date: "March 12, 2023",
      imageUrl: "https://i.postimg.cc/Prb8LTq0/blog2.jpg",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-green-900 mb-2">
              Latest from Our Blog
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Insights, stories, and updates about sustainability innovation
            </p>
          </div>
          <Button
            asChild
            variant="link"
            className="group text-green-600 hover:text-green-800 mt-4 md:mt-0"
          >
            <Link href="/blog">
              View All Posts
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <Button
                    asChild
                    variant="link"
                    className="text-green-600 hover:text-green-800 p-0"
                  >
                    <Link href={`/blog/${post.id}`}>Read More</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
