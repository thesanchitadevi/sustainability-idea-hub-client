"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  imageUrl: string;
  readTime: string;
  category: string;
}

export function BlogSection() {
  const featuredPost: BlogPost = {
    id: "1",
    title: "How Our Platform is Transforming Innovation in Bangladesh",
    excerpt:
      "Discover how local innovators are solving community challenges through collaborative idea sharing and implementation.",
    date: "May 15, 2023",
    author: "Tasnim Khan",
    imageUrl: "https://i.postimg.cc/YSd6vkdt/innovation.jpg",
    readTime: "5 min read",
    category: "Platform Updates",
  };

  const recentPosts: BlogPost[] = [
    {
      id: "2",
      title: "Top 10 Ideas That Changed Communities in 2023",
      excerpt:
        "A look at the most impactful solutions developed by our community members this year.",
      date: "April 28, 2023",
      author: "Farid Ahmed",
      imageUrl: "https://i.postimg.cc/dQyCY8cs/blog1.jpg",
      readTime: "4 min read",
      category: "Success Stories",
    },
    {
      id: "3",
      title: "The Psychology Behind Great Ideas",
      excerpt:
        "Understanding how creativity works and how to foster innovative thinking in your community.",
      date: "March 12, 2023",
      author: "Ayesha Rahman",
      imageUrl: "https://i.postimg.cc/Prb8LTq0/blog2.jpg",
      readTime: "6 min read",
      category: "Innovation",
    },
    {
      id: "4",
      title: "How to Pitch Your Idea Effectively",
      excerpt:
        "Practical tips for presenting your ideas to gain support and collaborators.",
      date: "February 5, 2023",
      author: "Rahim Islam",
      imageUrl: "https://i.postimg.cc/QxZTxHjp/blog3.jpg",
      readTime: "3 min read",
      category: "Tips & Tricks",
    },
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-green-900 mb-2">
              From Our Blog
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Insights, stories, and updates about innovation in Bangladesh
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="mt-4 md:mt-0 border-green-600"
          >
            <Link href="/blog" className="text-green-600 hover:text-green-800">
              View All Articles
            </Link>
          </Button>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex md:h-[350px]">
              <div className="md:w-1/2">
                <Image
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:w-1/2">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-green-600 bg-green-100 rounded-full mb-4">
                  {featuredPost.category}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      {featuredPost.author}
                    </p>
                    <p className="text-sm text-gray-400">
                      {featuredPost.date} · {featuredPost.readTime}
                    </p>
                  </div>
                  <Button
                    asChild
                    variant="link"
                    className="text-green-600 hover:text-green-800"
                  >
                    <Link href={`/blog/${featuredPost.id}`}>Read More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="grid gap-8 md:grid-cols-3">
          {recentPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 relative">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
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
