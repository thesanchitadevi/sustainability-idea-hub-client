import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative h-[550px]">
      {" "}
      {/* Fixed height for consistency */}
      {/* Background Image with Overlay - Next.js optimized */}
      <div className="absolute inset-0">
        <Image
          src={heroBg}
          alt="Sustainable community working together"
          fill
          priority
          className="object-cover"
          quality={80}
          placeholder="blur" // Optional blur-up effect
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>
      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-30">
        <div className="text-center">
          {/* Tagline */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Empowering Change Through
            <span className="block text-green-400">Sustainable Ideas</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
            Join our community to discover, share, and vote for innovations that
            shape a greener future.
          </p>

          {/* Search Bar with Filters */}
          <div className="mt-10 w-full max-w-2xl mx-auto">
            <div className="flex rounded-lg bg-white p-1 shadow-lg">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search ideas..."
                  className="w-full border-0 py-3 pl-10 pr-4 focus:ring-0 sm:text-sm"
                />
              </div>
              <select className="border-l border-gray-300 bg-transparent px-3 text-sm focus:outline-none">
                <option>ALL CATEGORIES</option>
                <option>ENERGY</option>
                <option>WASTE</option>
                <option>TRANSPORTATION</option>
              </select>
              <Button className="ml-2 mt-0.5 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Scrolling Indicator (Optional) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-white" />
      </div>
    </section>
  );
}
