import { CallToAction } from "@/components/pages/modules/Home/CallToAction";
import { FeaturedIdeas } from "@/components/pages/modules/Home/FeaturedIdeas";
import { HeroSection } from "@/components/pages/modules/Home/Hero";
import { IdeaCategories } from "@/components/pages/modules/Home/IdeaCategories";
import { LatestBlogPosts } from "@/components/pages/modules/Home/LatestBlogPost";
import { Partners } from "@/components/pages/modules/Home/Partners";
import Stats from "@/components/pages/modules/Home/Stats";
import { Testimonials } from "@/components/pages/modules/Home/Testimonials";

const HomePage = async () => {
  return (
    <>
      <HeroSection />
      <IdeaCategories />
      <FeaturedIdeas />
      <Stats />
      <Testimonials />
      <LatestBlogPosts />
      <Partners /> {/* Add this component */}
      <CallToAction />
    </>
  );
};

export default HomePage;
