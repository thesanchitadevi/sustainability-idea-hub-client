import heroBg from "@/assets/hero-bg.jpg";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import HomeSearchBar from "./HomeSearchBar";

export function HeroSection() {
  return (
    <section className="relative h-[550px]">
      {/* Background Image with Overlay - Next.js optimized */}
      <div className="absolute inset-0">
        <Image
          src={heroBg}
          alt="Sustainable community working together"
          fill
          priority
          className="object-cover"
          quality={80}
          placeholder="blur"
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

          <HomeSearchBar />
        </div>
      </div>

      {/* Scrolling Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-white" />
      </div>
    </section>
  );
}
